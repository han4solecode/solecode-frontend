function PageLayout(props) {
  const { pageTitle, children } = props;

  return (
    <div className="container mx-auto max-w-7xl py-3">
      <div className="flex flex-col">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
