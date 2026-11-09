"use client";

type Props = {
  categories: string[];
  value: string;
  onChange: (c: string) => void;
};

export default function CategoryFilters({ categories, value, onChange }: Props) {
  return (
    <div className="filters" role="tablist" aria-label="카테고리 필터">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={c === value}
          className="filter-chip"
          data-active={c === value}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
