const PopUp = ({ children }) => {
	return <div className='offcanvas offcanvas-end show' data-bs-backdrop="static">{children}</div>;
};

const PopUpHeader = ({ children }) => {
	return <div className='offcanvas-header p-0'>{children}</div>;
};

const PopUpBody = ({ children }) => {
	return <div className='offcanvas-body p-0'>{children}</div>;
};

const PopUpFooter = ({ children }) => {
	return <div className='offcanvas-footer'>{children}</div>;
};

PopUp.Header = PopUpHeader;
PopUp.Body = PopUpBody;
PopUp.Footer = PopUpFooter;

export default PopUp;
