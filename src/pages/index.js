import React from 'react';
import {Link, graphql} from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import {rhythm} from '../utils/typography';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Post = styled.div`
  display: flex;
`;

const PostImage = styled.div`
  flex: 20%;
  margin-right: 1rem;
`;

const PostText = styled.div`
  flex: 80%;
`;

class BlogIndex extends React.Component {
  render() {
    const {data} = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allContentfulPost.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({node}) => {
          const title = node.title || node.slug;
          return (
            <Link style={{boxShadow: `none`}} to={node.slug} key={node.slug}>
              <Post>
                <PostImage>
                  <Img fluid={node.image.fluid} />
                </PostImage>
                <PostText>
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    {title}
                  </h3>
                  <p>{node.subtitle}</p>
                </PostText>
              </Post>
            </Link>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          author
          slug
        }
      }
    }
  }
`;
