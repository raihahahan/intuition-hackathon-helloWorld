import { UserInputResult } from "@/features/inputResult/inputResult-types";
import { ActionIcon, Button, Checkbox, Table } from "@mantine/core";
import { Dispatch } from "@reduxjs/toolkit";
import React, { CSSProperties } from "react";
import {
  FiDelete,
  FiEdit,
  FiEye,
  FiPenTool,
  FiPlus,
  FiSearch,
  FiTrash,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/router";
import useTheme, { useGlobalMediaQuery } from "../theme/theme-hooks";
import { formatDate } from "../../common/utils/utils";
import { UserInput } from "../input/input-types";
import useIndexList from "./table-hooks";

export function MainTable({ res }: { res: UserInputResult[] }) {
  const finalRes = res.filter(
    (i) => i.userInput?.tickerSymbol != null && i.userInput?.tickerSymbol != ""
  );
  const indexVarList = useIndexList(finalRes);
  const headers = <TableHeaders indexVarList={indexVarList} />;
  const rows = <TableRows res={finalRes} indexVarList={indexVarList} />;
  const { siteColors } = useTheme();
  return (
    <div style={{ minWidth: "60vw", marginTop: 50 }}>
      <TableTitleHeader
        styles={{ color: siteColors.text.primary }}
        indexVarList={indexVarList}
        customTitle={"Past inputs"}
      />
      <MyTable headers={headers} rows={rows} />
    </div>
  );
}

function SearchBarCrossIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon>
      <FiX onClick={onClick} />
    </ActionIcon>
  );
}

function SearchBarSearchIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon onClick={onClick}>
      <FiSearch />
    </ActionIcon>
  );
}

export function MyTable({
  headers,
  rows,
}: {
  headers: JSX.Element;
  rows: JSX.Element;
}) {
  const { siteColors } = useTheme();
  const { sm } = useGlobalMediaQuery();
  return (
    <Table
      style={{
        backgroundColor: siteColors.header,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        minWidth: "60vw",
      }}
      horizontalSpacing={sm ? "md" : "xl"}
      verticalSpacing="md"
      fontSize={sm ? "md" : "lg"}
    >
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export function TableTitleHeader({
  indexVarList,
  disableDelete,
  disableCreate,
  styles,
  customTitle,
}: {
  customTitle: string;
  indexVarList?: TUseIndexList;
  disableDelete?: boolean;
  disableCreate?: boolean;
  styles?: CSSProperties;
}) {
  const buttonHandlers = indexVarList?.buttonHandlers;
  const { sm } = useGlobalMediaQuery();
  const { siteColors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: siteColors.themeColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        ...(styles as object),
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            paddingLeft: 15,
            fontSize: sm ? 17 : undefined,
          }}
        >
          {customTitle}
        </h1>
      </div>
      <div style={{ paddingRight: 10 }}>
        {!disableDelete && (
          <Button
            size={sm ? "sm" : "md"}
            color="red"
            style={{ margin: 5, borderColor: "white", borderWidth: 2 }}
            onClick={buttonHandlers?.onClickMasterRemove}
          >
            <FiTrash style={{ marginRight: sm ? 0 : 10 }} />
            {!sm && "Delete"}
          </Button>
        )}
        {!disableCreate && (
          <Button
            size={sm ? "sm" : "md"}
            color="green"
            style={{ margin: 5, borderColor: "white", borderWidth: 2 }}
            onClick={buttonHandlers?.onClickAdd}
          >
            <FiPlus style={{ marginRight: sm ? 0 : 10 }} />
            {!sm && "Create"}
          </Button>
        )}
      </div>
    </div>
  );
}

export interface TUseIndexList {
  buttonHandlers: {
    onClick(item: UserInputResult): void;
    onClickRemove(item: UserInputResult): void;
    onClickMasterRemove(): void;
    onClickAdd(): void;
    onClickResult(item: UserInputResult): void;
  };
  selectedHandlers: {
    selected: UserInputResult[];
    setSelected: React.Dispatch<React.SetStateAction<UserInputResult[]>>;
  };
  tableHandlers: {
    onSelectTop(): void;
    onSelect(item: UserInputResult): void;
  };
  checkBoxChecked: (element: UserInputResult) => boolean;
  topCheckBoxChecked: boolean;
}

function TableRows({
  res,
  indexVarList,
}: {
  res: UserInputResult[];
  indexVarList: TUseIndexList;
}) {
  const { buttonHandlers, tableHandlers, selectedHandlers, checkBoxChecked } =
    indexVarList;
  const { sm } = useGlobalMediaQuery();
  const { siteColors } = useTheme();
  const router = useRouter();
  return (
    <>
      {res.map((element, index) => {
        return (
          <tr key={element?.id}>
            <td>
              <Checkbox
                key={selectedHandlers.selected.length}
                checked={checkBoxChecked(element)}
                onClick={() => tableHandlers.onSelect(element)}
              />
            </td>
            {!sm && (
              <td style={{ color: siteColors.text.primary }}>{element?.id}</td>
            )}
            <td style={{ color: siteColors.text.primary }}>
              {element?.userInput?.tickerSymbol}
            </td>
            {!sm && (
              <td style={{ color: siteColors.text.primary }}>
                {formatDate(new Date(element?.createdOn))}
              </td>
            )}
            <td
              style={{
                color: siteColors.text.primary,
              }}
            >
              <TableDeleteIcon
                onClick={() => buttonHandlers.onClickRemove(element)}
              />
            </td>
            <td>
              <TableResultIcon
                onClick={() => buttonHandlers.onClickResult(element)}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

function TableHeaders({ indexVarList }: { indexVarList: TUseIndexList }) {
  const { tableHandlers, topCheckBoxChecked } = indexVarList;
  const { siteColors } = useTheme();
  const { sm } = useGlobalMediaQuery();
  return (
    <>
      <th>
        <Checkbox
          checked={topCheckBoxChecked}
          onClick={tableHandlers.onSelectTop}
        />
      </th>
      {!sm && <th style={{ color: siteColors.text.primary }}>ID</th>}
      <th style={{ color: siteColors.text.primary }}>Ticker symbol</th>
      {!sm && <th style={{ color: siteColors.text.primary }}>Created at</th>}
      <th style={{ color: siteColors.text.primary }}>Actions</th>
      <th style={{ color: siteColors.text.primary }}>Result</th>
    </>
  );
}

function TableDeleteIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon onClick={onClick}>
      <FiDelete style={{ color: "red" }} />
    </ActionIcon>
  );
}

function TableResultIcon({ onClick }: TButtonProps) {
  const { siteColors } = useTheme();
  return (
    <ActionIcon onClick={onClick}>
      <FiEye
        style={{
          color: siteColors.text.primary,
        }}
      />
    </ActionIcon>
  );
}

export interface TButtonProps {
  onClick: (args?: any) => void;
}
