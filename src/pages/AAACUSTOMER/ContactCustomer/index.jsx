import Footer from '../../../components/CustomerFooter';
function ContactCustomer() {
    return (
        <div className="flex flex-col justify-between h-[689px] overflow-y-scroll">
            <div className="flex flex-col  justify-between  px-[200px] border-b-2 border-solid border-gray-200 ">
                <div className="font-semibold text-4xl w-full text-green-600">Thực phẩm sạch</div>
                <div className="font-semibold text-4xl w-full">Ngon, bổ, rẻ.</div>
                <div className="flex">
                    <div className="btn btn-green btn-md">Đi ngay</div>
                    <div className="btn btn-green btn-md">Tìm hiểu thêm</div>
                    <div className="btn">Tìm hiểu thêm</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactCustomer;
