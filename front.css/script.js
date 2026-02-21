/* --- PHẦN JAVASCRIPT ĐÃ SỬA LỖI ẢNH --- */

    // 1. Dữ liệu mẫu (Đã cập nhật link ảnh ổn định hơn)
    let products = [
      { 
        id: 1, 
        name: "Lốp Michelin Primacy 4", 
        price: 2500000, 
        // Link ảnh thật
        img: "https://lopxehiepphat.com/wp-content/uploads/2020/10/michelin-primacy-4-205-55r16.jpg" 
      },
      { 
        id: 2, 
        name: "Nhớt Castrol Magnatec 5W-30", 
        price: 850000, 
        // Link ảnh minh họa từ nguồn miễn phí (nếu link trên lỗi)
        img: "https://images.unsplash.com/photo-1590424757336-f2d0b324a674?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      },
      { 
        id: 3, 
        name: "Gạt mưa Bosch Cao Cấp", 
        price: 350000, 
        img: "https://bizweb.dktcdn.net/100/366/833/products/gat-mua-bosch-aerotwin-plus.jpg" 
      },
      { 
        id: 4, 
        name: "Camera Hành Trình Vietmap", 
        price: 3200000, 
        img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/camera-hanh-trinh-vietmap-c61-pro-1.jpg" 
      }
    ];

    let cart = [];

    // 2. Hàm hiển thị sản phẩm (Có xử lý lỗi ảnh thông minh)
    function renderProducts(list) {
      const container = document.getElementById("product-list");
      container.innerHTML = ""; 

      if (list.length === 0) {
        container.innerHTML = "<p style='text-align:center; width:100%'>Không tìm thấy sản phẩm nào.</p>";
        return;
      }

      list.forEach(product => {
        // Tạo thẻ div sản phẩm
        const card = document.createElement("div");
        card.className = "product-card";
        
        // URL ảnh dự phòng (Màu xám có chữ Phụ Tùng) - Link này cực bền
        const backupImg = "https://placehold.co/400x300?text=Phu+Tung+O+To";

        card.innerHTML = `
          <img 
            src="${product.img}" 
            alt="${product.name}" 
            onerror="this.onerror=null; this.src='${backupImg}';" 
          />
          <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price.toLocaleString('vi-VN')} đ</div>
            <button class="btn-buy" onclick="addToCart(${product.id})">CHỌN MUA</button>
          </div>
        `;
        
        container.appendChild(card);
      });
    }

    // 3. Tìm kiếm
    function handleSearch() {
      const keyword = document.getElementById("search-input").value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
      renderProducts(filtered);
    }

    // 4. Thêm vào giỏ (Đã sửa lỗi chọn nhầm sản phẩm khi tìm kiếm)
    function addToCart(id) {
      // Tìm sản phẩm chính xác theo ID
      const product = products.find(p => p.id === id);
      
      if (product) {
        cart.push(product);
        updateCartUI();
        // Hiệu ứng rung nhẹ giỏ hàng
        const btn = document.querySelector('.header-actions button');
        btn.style.color = '#ffeb3b';
        setTimeout(() => btn.style.color = 'white', 300);
      }
    }

    // 5. Cập nhật giao diện giỏ hàng
    function updateCartUI() {
      document.getElementById("cart-count").innerText = cart.length;
      
      const list = document.getElementById("cart-items-container");
      const totalEl = document.getElementById("cart-total");
      
      if (cart.length === 0) {
        list.innerHTML = "<p>Giỏ hàng trống</p>";
        totalEl.innerText = "0";
        return;
      }

      list.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <span>${index + 1}. ${item.name}</span>
          <span>${item.price.toLocaleString('vi-VN')} đ 
            <b onclick="removeFromCart(${index})" style="color:red; cursor:pointer; margin-left:5px;">(x)</b>
          </span>
        `;
        list.appendChild(div);
      });

      totalEl.innerText = total.toLocaleString('vi-VN');
    }

    // 6. Xóa khỏi giỏ
    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartUI();
    }

    // 7. Admin thêm sản phẩm
    function addNewProduct() {
      const name = document.getElementById("new-name").value;
      const price = document.getElementById("new-price").value;
      const img = document.getElementById("new-img").value;

      if (name && price) {
        const newProduct = {
          id: Date.now(), // Tạo ID ngẫu nhiên theo thời gian
          name: name,
          price: parseInt(price),
          img: img || "https://placehold.co/400x300?text=Hang+Moi" // Nếu không nhập ảnh thì dùng ảnh mẫu
        };
        
        products.push(newProduct);
        renderProducts(products); // Vẽ lại danh sách
        
        // Xóa trắng ô nhập
        document.getElementById("new-name").value = "";
        document.getElementById("new-price").value = "";
        document.getElementById("new-img").value = "";
        alert("Đã thêm thành công!");
      } else {
        alert("Vui lòng nhập tên và giá!");
      }
    }

    // 8. Modal (Cửa sổ bật lên)
    function toggleModal(id) {
      const modal = document.getElementById(id);
      if(modal.style.display === 'flex') {
        modal.style.display = 'none';
      } else {
        modal.style.display = 'flex';
      }
    }

    // Chạy lần đầu khi web tải xong
    renderProducts(products);

    /* --- KẾT THÚC JAVASCRIPT --- */