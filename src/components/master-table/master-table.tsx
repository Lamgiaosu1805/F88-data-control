import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { ReactNode, memo } from "react";
interface TableProp {
  dataSource: any;
  loading: boolean;
  columns: ColumnsType<any>;
  totalResults: number | 0;
  page: number | 1;
  onChangePage: (page: number, pageSize: number) => void;
  limit: number;
  size: "large" | "middle" | "small";
  bordered?: boolean;
  title?: ReactNode;
  position:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";
}
const MasterTable = memo(
  ({
    dataSource,
    loading,
    columns,
    totalResults,
    page,
    limit,
    size,
    bordered,
    title,
    position,
    onChangePage,
    ...props
  }: TableProp & TableProps<any>) => {
    return (
      <>
        {title}
        <Table
          dataSource={dataSource} // use operator ?? or fix
          bordered={bordered}
          size={size} //fix
          loading={loading} // dynamic
          columns={columns} // dynamic
          rowKey={"id"} // fix
          key={"id"}
          pagination={{
            position: [position], //dynamic
            total: totalResults, //total items
            current: page, //curent page
            onChange: onChangePage, //onchange reveive a callback => dynamic
            pageSize: limit, // number of items on 1 page => fix or dynamic .  recommend fix value:10
            defaultCurrent: 1, // default page when init life circle
          }}
          {...props}
        />
      </>
    );
  }
);

export default MasterTable;
