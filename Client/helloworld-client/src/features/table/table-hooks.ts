import { TUseIndexList } from "./table-components";
import { useState } from "react";
import { useRouter } from "next/router";
import inputResultApiClient from "../inputResult/inputResult-api-client";
import { UserInputResult } from "../inputResult/inputResult-types";

export default function useIndexList(res: UserInputResult[]): TUseIndexList {
  const [selected, setSelected] = useState<UserInputResult[]>([]);
  const router = useRouter();

  const buttonHandlers = {
    onClick(item: UserInputResult) {
      router.push(`/result/${item.id}`);
    },
    onClickRemove(item: UserInputResult) {
      const confirmation = confirm("Are you sure?");
      if (!confirmation) return;
      inputResultApiClient.delete(item.id as number);
      //decisionActions?.remove(item.id as number);
    },
    onClickMasterRemove() {
      if (selected.length <= 0) {
        alert("Please select at least 1 item.");
        return;
      }
      const confirmation = confirm("Are you sure?");
      if (!confirmation) return;
      selected.forEach((item) => {
        inputResultApiClient.delete(item.id as number);
        //decisionActions?.remove(item.id as number);
      });
      setSelected([]);
    },
    onClickAdd() {
      router.push("/");
    },
    onClickResult(item: UserInputResult) {
      router.push(`/result/${item.id}`);
    },
  };

  const tableHandlers = {
    onSelectTop() {
      if (selected.length == res.length) {
        setSelected([]);
      } else {
        setSelected(res);
      }
    },
    onSelect(item: UserInputResult) {
      if (selected.find((i) => i.id == item.id)) {
        setSelected((i) => i.filter((_item) => _item.id != item.id));
      } else {
        setSelected((i) => [...i, item]);
      }
    },
  };

  const checkBoxChecked = (element: UserInputResult): boolean =>
    selected.find((i) => i.id == element.id) != undefined;

  const topCheckBoxChecked = selected.length == res.length && res.length != 0;
  return {
    buttonHandlers,
    tableHandlers,
    selectedHandlers: { selected, setSelected },
    checkBoxChecked,
    topCheckBoxChecked,
  };
}
