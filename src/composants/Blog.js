import React, { Component } from 'react'
import NvPost from './NvPost/NvPost'
import PostModale from './PostModale/PostModale'
import './Blog.css'
import Axios from 'axios'
import Post from './Post/Post'
class Blog extends Component {


    state= {
        posts:[],
        selectedPostId: null,
        toggle: false
    }
componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        const articles = response.data.slice(0,4);
        this.setState({posts: articles})
       
    })
}

    selectId = id => {
        this.setState({selectedPostId: id})
        this.setState({toggle:true})
    }
    toggleModale = () => {
        this.setState({toggle:false})
    }
    render () {
        const posts = this.state.posts.map(post=> {
            return <Post key={post.id} titre={post.title} clicked={()=> this.selectId(post.id)}/>
        })
        return (
            <div>
                <section>
                <NvPost />
                </section>
                <h2 className="text-center my-5">Choisissez un post ...</h2>
                <PostModale id={this.state.selectedPostId} cache={this.toggleModale} toggle={this.state.toggle}/>
                <section className="Posts">
                    {posts}
                </section>

            </div>
        );
    }
}

export default Blog;