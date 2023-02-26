import { InputPageComponents } from "@/features/input/input-components";
import { breakpoints } from "@/features/theme/theme-data";
import { useForm } from "@mantine/form";

export default function InputIndexPage() {
  return (
    <div
      style={{
        padding: 20,
        width: "90vw",
        maxWidth: breakpoints.sm + 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputPageComponents />
    </div>
  );
}
