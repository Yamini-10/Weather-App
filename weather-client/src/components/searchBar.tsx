import styles from "./SearchBar.module.css";

interface Props {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

export default function SearchBar({
  city,
  onCityChange,
  onSearch,
  disabled,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        placeholder="Enter city"
        disabled={disabled}
      />
      <button
        className={styles.button}
        onClick={onSearch}
        disabled={disabled}
      >
        Search
      </button>
    </div>
  );
}
