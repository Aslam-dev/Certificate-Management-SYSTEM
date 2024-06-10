import { redirect } from 'next/navigation';
import Banner from 'components/admin/profile/Banner';
import InputField from 'components/fields/InputField';
import FooterAuthDefault from 'components/footer/FooterAuthDefault';
export default function Home({}) {
  return (
    <>
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-6xl p-5">
        <div className="mt-3 flex h-fit w-full flex-col gap-5 lg:grid ">
          <div className="col-span-8 mx-auto w-full">
            <Banner />
          </div>

          <div className="col-span-8  mx-auto w-full max-w-xl">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Insert Student NIC Number"
              placeholder="Only Number Dont Put Any Letters"
              id="username"
              type="text"
            />
            <button className="linear w-full  rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Verify
            </button>
          </div>
        </div>
      </div>
      
    </div>
    <FooterAuthDefault />
    </>
  );
}
