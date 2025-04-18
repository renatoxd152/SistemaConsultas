import { DataTableFilterMeta } from "primereact/datatable";

export interface Page<T>{
    content:Array<T>;
    size:number;
    number:number;
    totalElements:number;
    first:number;
    filters?:DataTableFilterMeta;
    sortField?:string;
    sortOrder?: 0 |1 | -1 | null;
}