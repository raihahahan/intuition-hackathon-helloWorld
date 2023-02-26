import { debounce } from "@/common/utils/decorators";
import { AppDispatch } from "@/redux/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAutoCompleteSymbols,
  selectAutoCompleteSymbols,
} from "./market-slice";

export function useAutocompleteSearchSymbols() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const autocomplete: string[] = useSelector(selectAutoCompleteSymbols);
  const dispatch = useDispatch<AppDispatch>();
  const onChangeText: (text: string) => void = (text: string) => {
    setSearch(text);
    if (text.length == 0) return;

    function changeText(
      arg: AsyncThunkAction<
        string[],
        {
          query: string;
        },
        {}
      >
    ) {
      setLoading(true);
      console.log("Testing");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      dispatch(arg);
    }
    debounce(changeText, 1000)(getAutoCompleteSymbols({ query: text }));
  };
  const onSelectItem: (item: string) => void = (item: string) => {
    setSearch(item);
  };

  return { onChangeText, onSelectItem, search, loading, autocomplete };
}
