export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Điều khoản và Điều kiện</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Chấp nhận Điều khoản</h2>
        <p className="mb-2">
          Bằng việc truy cập hoặc sử dụng trang web bộ sưu tập ảnh du lịch của
          chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản và
          Điều kiện này.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. Sử dụng Nội dung</h2>
        <p className="mb-2">
          Tất cả các hình ảnh và nội dung được cung cấp trên trang web này đều
          miễn phí để sử dụng cho mục đích cá nhân và thương mại.
        </p>
        <p className="mb-2">
          Bạn có thể tải xuống, chia sẻ và sử dụng các hình ảnh mà không cần xin
          phép trước, tuy nhiên việc ghi nguồn hoặc liên kết đến trang web của
          chúng tôi sẽ được đánh giá cao.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Sở hữu Trí tuệ</h2>
        <p className="mb-2">
          Mặc dù các hình ảnh được cung cấp miễn phí để sử dụng, chúng tôi vẫn
          giữ quyền sở hữu trí tuệ đối với tất cả các hình ảnh trên trang web
          này.
        </p>
        <p className="mb-2">
          Bạn không được tuyên bố rằng mình là tác giả của bất kỳ hình ảnh nào
          từ bộ sưu tập của chúng tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          4. Chất lượng và Thông tin Hình ảnh
        </h2>
        <p className="mb-2">
          Chúng tôi cố gắng cung cấp thông tin chính xác về địa điểm, thời gian
          và nội dung của mỗi hình ảnh, tuy nhiên không đảm bảo tính chính xác
          tuyệt đối của những thông tin này.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. Tài khoản Người dùng</h2>
        <p className="mb-2">
          Nếu bạn tạo tài khoản trên trang web của chúng tôi để lưu bộ sưu tập
          yêu thích hoặc bình luận, bạn có trách nhiệm duy trì tính bảo mật
          thông tin tài khoản của mình và chịu trách nhiệm cho mọi hoạt động
          dưới tài khoản của bạn.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">6. Giới hạn Trách nhiệm</h2>
        <p className="mb-2">
          Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp,
          gián tiếp, ngẫu nhiên, hậu quả hoặc mang tính trừng phạt phát sinh từ
          việc truy cập, sử dụng hoặc tải xuống hình ảnh từ trang web của chúng
          tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">7. Thay đổi Điều khoản</h2>
        <p className="mb-2">
          Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Việc
          tiếp tục sử dụng trang web sau những thay đổi đó đồng nghĩa với việc
          bạn chấp nhận các điều khoản đã được sửa đổi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">8. Luật điều chỉnh</h2>
        <p className="mb-2">
          Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp
          hiện hành, không liên quan đến các nguyên tắc xung đột pháp luật.
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
