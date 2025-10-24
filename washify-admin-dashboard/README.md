# Washify Admin Dashboard

Admin Dashboard cho hệ thống quản lý giặt là Washify, được xây dựng bằng React và TypeScript.

## Tính năng chính

### ✅ Đã hoàn thành
- **Authentication**: Hệ thống đăng nhập bảo mật với JWT
- **Dashboard tổng quan**: Hiển thị thống kê tổng quan hệ thống
- **Quản lý đơn hàng**: Xem danh sách và chi tiết đơn hàng
- **Giao diện responsive**: Tối ưu cho desktop và mobile
- **API Integration**: Tích hợp với admin API có sẵn
- **Role-based Access**: Phân quyền theo vai trò (Admin/Manager/Staff)

### 🚧 Đang phát triển
- Quản lý khách hàng
- Quản lý dịch vụ giặt là
- Quản lý chi nhánh
- Quản lý shipper
- Quản lý khuyến mãi
- Hệ thống thông báo
- Cài đặt hệ thống

## Công nghệ sử dụng

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Axios** - HTTP Client  
- **Lucide React** - Icons
- **CSS3** - Styling (No frameworks, pure CSS)

## Cấu trúc dự án

```
src/
├── components/          # React Components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Dashboard.tsx   # Dashboard tổng quan
│   └── Orders.tsx      # Quản lý đơn hàng
├── services/           # API Services
│   ├── apiClient.ts    # Axios configuration
│   └── apiService.ts   # API calls
├── types/              # TypeScript Types
│   └── api.ts          # API response types
├── App.tsx             # Main App component
├── index.tsx           # Entry point
└── index.css           # Global styles
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
cd washify-admin-dashboard
npm install
```

### 2. Cấu hình API URL
Tạo file `.env` trong thư mục gốc:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 3. Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### 4. Build production
```bash
npm run build
```

## API Integration

Dashboard sử dụng các API từ admin-api:

- **Orders**: `/api/orders/*` - Quản lý đơn hàng
- **Users**: `/api/users/*` - Quản lý khách hàng  
- **Services**: `/api/services/*` - Quản lý dịch vụ
- **Branches**: `/api/branches/*` - Quản lý chi nhánh
- **Shippers**: `/api/shippers/*` - Quản lý shipper
- **Notifications**: `/api/notifications/*` - Thông báo

## Authentication

Hệ thống sử dụng JWT Bearer Token:

- Token được lưu trong localStorage
- Tự động thêm vào header của mọi request
- Redirect về login khi token hết hạn

### Truy cập hệ thống

Sử dụng tài khoản đã được tạo trong hệ thống backend với các role:
- **ADMIN**: Quản trị viên hệ thống - Toàn quyền truy cập
- **MANAGER**: Quản lý chi nhánh - Quản lý trong phạm vi chi nhánh  
- **STAFF**: Nhân viên vận hành - Quyền hạn cơ bản

> **Lưu ý**: Chỉ tài khoản có role ADMIN, MANAGER, hoặc STAFF mới có thể truy cập vào dashboard.

## Tính năng chính

### Dashboard
- Thống kê tổng đơn hàng, doanh thu
- Số lượng shipper hoạt động
- Đơn hàng hôm nay và chờ xử lý
- Biểu đồ trạng thái đơn hàng

### Quản lý đơn hàng
- Danh sách đơn hàng với phân trang
- Lọc theo trạng thái
- Xem chi tiết đơn hàng
- Cập nhật trạng thái đơn hàng

### Giao diện
- Design hiện đại, clean
- Responsive trên mọi thiết bị
- Dark sidebar với accent blue
- Status badges với màu sắc trực quan

## Customization

### Thêm tính năng mới
1. Tạo service trong `src/services/apiService.ts`
2. Tạo component trong `src/components/`
3. Thêm route trong `App.tsx`
4. Cập nhật sidebar navigation

### Styling
- Tất cả styles trong `src/index.css`
- Sử dụng CSS variables cho theming
- Utility classes cho spacing, layout

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Bundle size: ~500KB (gzipped)
- First Paint: <2s
- Interactive: <3s
- Optimized cho mobile networks

## Security

- XSS protection via React
- CSRF token trong API calls
- Input validation
- Secure token storage

## Deployment

### Build tối ưu
```bash
npm run build
```

### Deploy lên server
Upload thư mục `build/` lên web server hoặc CDN.

### Environment Variables
```env
REACT_APP_API_BASE_URL=https://api.washify.com
REACT_APP_APP_NAME=Washify Admin
```

## Roadmap

### Phase 2 (Sắp tới)
- [ ] Quản lý khách hàng đầy đủ
- [ ] CRUD cho dịch vụ giặt là
- [ ] Quản lý chi nhánh
- [ ] Dashboard analytics chi tiết

### Phase 3
- [ ] Real-time notifications
- [ ] Export/Import data
- [ ] Multi-language support
- [ ] Advanced reporting

## Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án sử dụng cho mục đích học tập và thương mại.

## Support

Liên hệ: support@washify.com

---

🧺 **Washify** - Hệ thống quản lý giặt là thông minh