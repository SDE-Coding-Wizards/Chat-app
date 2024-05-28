import axios from "axios";
import { useEffect, useState } from "react";

export function useData<T>(initialState: T, url: string) {
  const [data, setData] = useState<T>(initialState);

  async function getData() {
    const res = await axios.get(url);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return [data, setData] as const;
}