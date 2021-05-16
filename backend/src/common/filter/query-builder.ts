import {
  Between,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

import { LookupDelimiter, LookupFilter } from './lookup.enum';

export class QueryBuilder {
  private query: any;
  private typeORMQuery: any;
  private mapping: Record<string, unknown>;

  constructor(query: any, mapping: Record<string, unknown>) {
    this.query = query;
    this.typeORMQuery = {
      where: [],
    };
    this.mapping = mapping;
  }

  public build(): any {
    this.setPage();
    this.setLimit();
    this.setOrder();
    this.setWhere();

    return this.typeORMQuery;
  }

  private setPage() {
    this.typeORMQuery.skip = this.query.skip ?? 0;
  }

  private setLimit() {
    this.typeORMQuery.take = this.query.take ?? 15;
  }

  private setOrder() {
    if (!this.query.order) {
      return;
    }

    const orderFields = this.query.order.split(',');

    for (const field of orderFields) {
      const orderCriteria = this.getOrderCriteria(field);

      this.typeORMQuery.order = {
        ...this.typeORMQuery.order,
        [field.substr(1, field.length)]: orderCriteria,
      };
    }
  }

  private getOrderCriteria(field: string): string {
    if (field.startsWith('+')) {
      return 'ASC';
    }

    return 'DESC';
  }

  private setWhere() {
    const queryFilterParams = Object.keys(this.query)
      .filter((key) => !['order', 'skip', 'take'].includes(key))
      .reduce((res, key) => ((res[key] = this.query[key]), res), {});

    for (const queryItem in queryFilterParams) {
      this.get(this.typeORMQuery, queryItem, queryFilterParams);
    }
  }

  private get(query: any, key: string, params: Record<string, string>) {
    const valueWithOp = params[key];
    const mapping = this.mapping[key];
    const field = mapping
      ? typeof mapping === 'function'
        ? mapping(params)
        : mapping
      : key;
    const notQuery = valueWithOp.includes(
      `${LookupFilter.NOT}${LookupDelimiter.LOOKUP_DELIMITER}`,
    );
    const lookup = valueWithOp.includes(LookupDelimiter.LOOKUP_DELIMITER)
      ? valueWithOp.split(LookupDelimiter.LOOKUP_DELIMITER)[notQuery ? 1 : 0]
      : LookupFilter.EXACT;
    const value = valueWithOp.includes(LookupDelimiter.LOOKUP_DELIMITER)
      ? (valueWithOp.split(LookupDelimiter.LOOKUP_DELIMITER)[
          notQuery ? 2 : 1
        ] as LookupFilter)
      : valueWithOp;

    this.buildWhere(query, field, lookup, value, notQuery);
  }

  private buildWhere(query, field, lookup, value, notQuery) {
    let queryToAdd;

    switch (lookup) {
      case LookupFilter.EXACT:
        queryToAdd = { [field]: value };
        break;
      case LookupFilter.CONTAINS:
        queryToAdd = { [field]: Like(`%${value}%`) };
        break;
      case LookupFilter.STARTS_WITH:
        queryToAdd = { [field]: Like(`${value}%`) };
        break;
      case LookupFilter.ENDS_WITH:
        queryToAdd = { [field]: Like(`%${value}`) };
        break;
      case LookupFilter.IS_NULL:
        queryToAdd = { [field]: IsNull() };
        break;
      case LookupFilter.LT:
        queryToAdd = { [field]: LessThan(value) };
        break;
      case LookupFilter.LTE:
        queryToAdd = { [field]: LessThanOrEqual(value) };
        break;
      case LookupFilter.GT:
        queryToAdd = { [field]: MoreThan(value) };
        break;
      case LookupFilter.GTE:
        queryToAdd = { [field]: MoreThanOrEqual(value) };
        break;
      case LookupFilter.IN:
        queryToAdd = { [field]: In(value.split(',')) };
        break;
      case LookupFilter.BETWEEN:
        const rangeValues = value.split(',');

        queryToAdd = { [field]: Between(+rangeValues[0], +rangeValues[1]) };
        break;
    }

    if (notQuery) {
      queryToAdd[field] = Not(queryToAdd[field]);
    }

    if (queryToAdd) {
      query.where.push(queryToAdd);
    }
  }
}
