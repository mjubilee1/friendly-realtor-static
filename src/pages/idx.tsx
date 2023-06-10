import Head from 'next/head';

const IdxPage = () => {
  return (
    <>
      <Head>
        <script>
					document.currentScript.replaceWith(ihfKestrel.render());
				</script>
      </Head>
      <div>IDX Page</div>
    </>
  );
};

export default IdxPage;