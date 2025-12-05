import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeaderContent = ({
  title,
  description,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  showSearch = true,
  filters = [],
}) => {
  return (
    <>
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 mt-2">
          {description}
        </p>
      </div>

      {/* --- TOOLBAR (Tìm kiếm & Filter) --- */}
      {showSearch && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Ô tìm kiếm và Filter */}
            <div className="flex gap-3 flex-1">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder={searchPlaceholder || "Tìm kiếm..."}
                  className="pl-10 h-11 bg-white border-gray-200"
                />
              </div>
              
              {/* Các nút Filter */}
              {filters.map((filter, index) => (
                <Select key={index} value={filter.value} onValueChange={filter.onChange}>
                  <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      {index === 0 && <Filter className="w-4 h-4" />}
                      <SelectValue placeholder={filter.placeholder} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderContent;
