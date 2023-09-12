import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

type CustomDocumentInitialProps = DocumentInitialProps & {
  userId: string | undefined;
};
class DocumentWithApollo extends Document<CustomDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              // eslint-disable-next-line
              // @ts-ignore
              // eslint-disable-next-line react/jsx-props-no-spreading
              <App {...props} />,
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link
            rel="preload"
            href="https://cdn.theorg.com/fonts/Inter/Regular/Inter-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          /> */}
          <meta charSet="UTF-8"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentWithApollo;
