import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      const newPath = pathname.replace(`/${localeActive}`, `/${nextLocale}`);
      router.replace(newPath);
      console.log("isPending:", isPending);
    });
  };

  return (
    <label className="border-2 rounded border-none">
      <span className="sr-only">Change language</span>
      <select
        defaultValue={localeActive}
        className="bg-transparent py-2 rounded-md cursor-pointer px border-none hover:bg-gray-50 cursor-pointer"
        onChange={onSelectChange}
      >
        <option value="ru">🇷🇺 RU</option>
        <option value="ky">🇰🇬 KY</option>
      </select>
    </label>
  );
}
