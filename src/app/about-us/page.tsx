export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Đôi nét về Trips Hungba!</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Lời cảm ơn!</h2>
        <p className="mb-2">
          Chào bạn, <br></br>
          Cảm ơn bạn đã ghé thăm và ủng hộ trang web của chúng tôi. Chúc bạn có
          những trải nghiệm thú vị khi xem qua các chuyến đi của tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Người Sáng Lập</h2>
        <p className="mb-2">
          Xin chào! Tôi là một người đam mê du lịch và khám phá những vùng đất
          mới. Trang web này được tạo ra để lưu giữ và chia sẻ những kỷ niệm từ
          các chuyến đi của tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Về Trips Hungba</h2>
        <p className="mb-2">
          Trips Hungba là nơi tôi chia sẻ hình ảnh và kỷ niệm từ những chuyến đi
          mà tôi đã trải qua. Mỗi chuyến đi đều được ghi lại thời gian cụ thể,
          để sau này tôi và bạn đọc có thể nhìn lại và cảm nhận những khoảnh
          khắc đáng nhớ ấy.
        </p>
        <p className="mb-2">
          Tôi tin rằng mỗi chuyến đi đều là một câu chuyện riêng, mang đến những
          bài học và trải nghiệm quý giá mà không đâu khác có thể cho ta được.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Tính Năng Chính</h2>
        <p className="mb-2">
          <strong>Lưu Trữ Hình Ảnh:</strong> Tôi lưu trữ và chia sẻ những hình
          ảnh đẹp nhất từ mỗi chuyến đi, kèm theo cảm nhận cá nhân.
        </p>
        <p className="mb-2">
          <strong>Thông Tin Thời Gian:</strong> Mỗi chuyến đi đều có thông tin
          thời gian cụ thể, giúp tôi và bạn đọc có thể dễ dàng tra cứu và nhớ
          lại.
        </p>
        <p className="mb-2">
          <strong>Chi Tiết Hành Trình:</strong> Tôi chia sẻ các thông tin về lộ
          trình, địa điểm thăm quan và những trải nghiệm đáng nhớ trong mỗi
          chuyến đi.
        </p>
        <p className="mb-2">
          <strong>Tương Tác:</strong> Bạn có thể đóng góp ý kiến hoặc chia sẻ
          trải nghiệm của mình về các địa điểm mà tôi đã đến.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Hành Trình Của Tôi</h2>
        <p className="mb-2">
          Mỗi địa điểm tôi đến đều mang lại những cảm xúc và trải nghiệm khác
          nhau. Qua trang web này, tôi muốn lưu giữ những kỷ niệm quý báu và
          chia sẻ chúng với bạn.
        </p>
        <p className="mb-2">
          Hãy cùng tôi khám phá những vùng đất mới và tạo ra những kỷ niệm đáng
          nhớ!
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Cập nhật: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
