const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pb-8 pt-3 text-center">
      <p className="text-sm font-medium text-gray-600 md:text-base">
        ©{new Date().getFullYear()} a2zexpert's Tech Solutions. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
