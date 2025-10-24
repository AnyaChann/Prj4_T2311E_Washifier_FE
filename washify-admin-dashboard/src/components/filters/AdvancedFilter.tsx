import React, { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';

export interface FilterConfig {
  searchTerm?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  [key: string]: any;
}

interface AdvancedFilterProps {
  onFilterChange: (filters: FilterConfig) => void;
  statusOptions?: { value: string; label: string }[];
  showDateRange?: boolean;
  showStatus?: boolean;
  placeholder?: string;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  onFilterChange,
  statusOptions = [],
  showDateRange = true,
  showStatus = true,
  placeholder = 'Tìm kiếm...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchTerm: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleDateFromChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, dateFrom: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleDateToChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, dateTo: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, status: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleReset = useCallback(() => {
    const emptyFilters: FilterConfig = {
      searchTerm: '',
      dateFrom: '',
      dateTo: '',
      status: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  }, [onFilterChange]);

  const hasActiveFilters = filters.searchTerm || filters.dateFrom || filters.dateTo || filters.status;

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Search bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          paddingLeft: '0.75rem'
        }}>
          <Search style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder={placeholder}
            value={filters.searchTerm}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
          {filters.searchTerm && (
            <button
              onClick={() => {
                const newFilters = { ...filters, searchTerm: '' };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                color: '#94a3b8'
              }}
            >
              <X style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: hasActiveFilters ? '#3b82f6' : '#f1f5f9',
            color: hasActiveFilters ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          <Filter style={{ width: '16px', height: '16px' }} />
          Lọc
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            Xóa lọc
          </button>
        )}
      </div>

      {/* Advanced filters panel */}
      {isOpen && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {showDateRange && (
            <>
              <div>
                <label htmlFor="dateFrom" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  Từ ngày
                </label>
                <input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={handleDateFromChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              <div>
                <label htmlFor="dateTo" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  Đến ngày
                </label>
                <input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={handleDateToChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            </>
          )}

          {showStatus && statusOptions.length > 0 && (
            <div>
              <label htmlFor="status" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.25rem'
              }}>
                Trạng thái
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={handleStatusChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Tất cả trạng thái</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '0.75rem'
        }}>
          {filters.searchTerm && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              🔍 {filters.searchTerm}
              <button
                onClick={() => {
                  const newFilters = { ...filters, searchTerm: '' };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>
          )}

          {filters.dateFrom && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              📅 Từ: {new Date(filters.dateFrom).toLocaleDateString('vi-VN')}
              <button
                onClick={() => {
                  const newFilters = { ...filters, dateFrom: '' };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>
          )}

          {filters.dateTo && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              📅 Đến: {new Date(filters.dateTo).toLocaleDateString('vi-VN')}
              <button
                onClick={() => {
                  const newFilters = { ...filters, dateTo: '' };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>
          )}

          {filters.status && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              ✓ {statusOptions.find(o => o.value === filters.status)?.label}
              <button
                onClick={() => {
                  const newFilters = { ...filters, status: '' };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: '1rem',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
