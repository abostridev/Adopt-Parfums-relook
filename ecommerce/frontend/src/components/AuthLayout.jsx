const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <section className="bg-[#FAF7F5] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm">

        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl mb-3">
            {title}
          </h1>
          <p className="text-[#8A8A8A] text-sm">
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </section>
  );
};

export default AuthLayout;
