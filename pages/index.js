import { Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import NextLink from "next/link";

import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home(props) {
  const { products } = props;

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container Grid={3}>
          {products.map((product) => {
            return (
              <Grid item md={4} key={product.name}>
                <Card style={{ margin: "0.4rem" }}>
                  <NextLink href={`/product/${product.slug}`} legacyBehavior>
                    <a>
                      <CardActionArea>
                        <CardMedia
                          image={product.image}
                          title={product.tile}
                          component="img"
                        />
                      </CardActionArea>
                    </a>
                  </NextLink>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
