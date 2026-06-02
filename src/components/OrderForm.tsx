import React, { useState } from 'react';
import { ProductionOrder } from '../types';
import { FileText, X } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (order: ProductionOrder) => void;
  onCancel?: () => void;
}

export function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<Partial<ProductionOrder>>({
    orderCode: '',
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    productType: 'Áo Thun Cổ Tròn',
    classification: 'Có sẵn',
    fabricType: 'Cotton 100%',
    color: '',
    quantity: 10,
    sizeDetails: '',
    deliveryMethod: 'Giao Hàng Tiết Kiệm (COD)',
    codAmount: '',
    deliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // Mặc định +7 ngày
    notes: '',
    productionNotes: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, designImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.deliveryDate) return;

    const newOrder: ProductionOrder = {
      ...(formData as any),
      id: Math.random().toString(36).substr(2, 9),
      orderCode: formData.orderCode || `LSX-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };

    onSubmit(newOrder);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-900">Tạo Lệnh Sản Xuất</h2>
        {onCancel && (
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Mã Đơn Hàng (Tùy chọn)</label>
            <input
              type="text"
              value={formData.orderCode}
              onChange={e => setFormData({ ...formData, orderCode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="Để trống sẽ tự tạo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Ngày Giao Hàng Dự Kiến</label>
            <input
              required
              type="date"
              value={formData.deliveryDate}
              onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
            />
          </div>

          <div className="space-y-2 md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900">Thông Tin Khách Hàng</h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Tên Khách Hàng / Đơn Vị *</label>
            <input
              required
              type="text"
              value={formData.customerName}
              onChange={e => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="Vd: Công ty TNHH ABC"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Số Điện Thoại *</label>
            <input
              required
              type="text"
              value={formData.customerPhone}
              onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="Vd: 0912 345 678"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-900">Địa Chỉ Giao Hàng *</label>
            <input
              required
              type="text"
              value={formData.customerAddress}
              onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="Vd: 123 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM"
            />
          </div>

          <div className="space-y-2 md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900">Chi Tiết Sản Phẩm</h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Loại Sản Phẩm</label>
            <select
              value={formData.productType}
              onChange={e => setFormData({ ...formData, productType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white cursor-pointer"
            >
              <option value="Áo Thun Cổ Tròn">Áo Thun Cổ Tròn</option>
              <option value="Áo Thun Cổ Trụ (Polo)">Áo Thun Cổ Trụ (Polo)</option>
              <option value="Áo Khoác Gió">Áo Khoác Gió</option>
              <option value="Tạp Dề">Tạp Dề</option>
              <option value="Quần Lót Thể Thao">Quần Lót Thể Thao</option>
              <option value="Đồng Phục Bảo Hộ">Đồng Phục Bảo Hộ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Phân Loại Áo</label>
            <select
              value={formData.classification}
              onChange={e => setFormData({ ...formData, classification: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white cursor-pointer"
            >
              <option value="Có sẵn">Có sẵn</option>
              <option value="Đặt may">Đặt may</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Chất Liệu Vải</label>
            <select
              value={formData.fabricType}
              onChange={e => setFormData({ ...formData, fabricType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white cursor-pointer"
            >
              <option value="Cotton 100%">Cotton 100%</option>
              <option value="Cotton 65/35">Cotton 65/35</option>
              <option value="Cá Sấu Poly">Cá Sấu Poly</option>
              <option value="Cá Sấu Cotton">Cá Sấu Cotton</option>
              <option value="Poly Thái">Poly Thái</option>
              <option value="Lạnh Thể Thao">Lạnh Thể Thao</option>
              <option value="Vải Dù">Vải Dù</option>
              <option value="Kaki">Kaki</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Màu Sắc</label>
            <input
              type="text"
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="Vd: Đen, Trắng..."
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-sm font-semibold text-gray-900">Tổng Số Lượng *</label>
            <input
              required
              type="number"
              min="1"
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white font-mono text-lg"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-900">Chi Tiết Size Áo (Nam, Nữ, Unisex...)</label>
            <textarea
              rows={3}
              value={formData.sizeDetails}
              onChange={e => setFormData({ ...formData, sizeDetails: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none bg-gray-50/50 focus:bg-white"
              placeholder="- Nam: M(5), L(10), XL(2)
- Nữ: S(2), M(8), L(3)"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-900">Yêu Cầu Chi Tiết (In/Thêu, Phối Màu...)</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none bg-gray-50/50 focus:bg-white"
              placeholder="- Vị trí in: Ngực trái (logo nhỏ), Lưng (logo lớn)
- Quy cách: In lụa / In Pet / Thêu vi tính
- Màu áo: Xanh đen..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-900">Ghi Chú Sản Xuất (Hiển thị ở trang 2)</label>
            <textarea
              rows={4}
              value={formData.productionNotes}
              onChange={e => setFormData({ ...formData, productionNotes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none bg-gray-50/50 focus:bg-white"
              placeholder="Ghi chú thêm cho xưởng..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-900">Tải Ảnh Thiết Kế (Khách đã chốt)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl relative overflow-hidden bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="space-y-1 text-center">
                {formData.designImage ? (
                  <div className="relative">
                    <img src={formData.designImage} alt="Design preview" className="mx-auto h-48 object-contain rounded-md" />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, designImage: undefined }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="mt-2 text-sm text-gray-500">Đã tải ảnh lên. (Click "X" để xóa)</p>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Tải ảnh lên</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                      </label>
                      <p className="pl-1">hoặc kéo thả vào đây</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF lên đến 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900">Thông Tin Giao Hàng & Thanh Toán</h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Hình Thức Giao Hàng</label>
            <select
              value={formData.deliveryMethod}
              onChange={e => setFormData({ ...formData, deliveryMethod: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white cursor-pointer"
            >
              <option value="Giao Hàng Tiết Kiệm (COD)">Giao Hàng Tiết Kiệm (COD)</option>
              <option value="Gửi Chành Xe">Gửi Chành Xe</option>
              <option value="Khách Tới Văn Phòng Lấy">Khách Tới Văn Phòng Lấy</option>
              <option value="Grab Giao Hàng">Grab Giao Hàng</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Thu Hộ Tiền (COD - VND)</label>
            <input
              type="text"
              value={formData.codAmount}
              onChange={e => setFormData({ ...formData, codAmount: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
              placeholder="VD: 1,500,000 (Để trống nếu ko thu hộ)"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100 gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-sm shadow-blue-500/30 focus:ring-4 focus:ring-blue-500/20 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5" />
            Tạo File & Xem Trước Lệnh
          </button>
        </div>
      </form>
    </div>
  );
}
