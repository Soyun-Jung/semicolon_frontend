import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { HeartFull, HeartEmpty, Comment as CommentIcon} from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const PostComment = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 300px;
  user-select: none;
  margin-bottom: 25px;
  a{
    color:inherit;
  }
  flexDirection: row;
  
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const UserColumn = styled.div`
  margin-left: 10px;
  
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: url(${props => props.src});
  background-size:cover;
  background-position: left;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Div = styled.div`
  display: flex;
`;

const Button = styled.span`
  cursor: pointer;
  
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  padding-top:10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const CommentCount = styled.span`
  font-weight: 400;
  opacity: 0.6;
  display: block;
  font-size: 12px;
  margin: 5px 0px;
  padding-bottom: 4px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Comments = styled.ul`
  height:340px;
  margin-top:10px;
  overflow-y: auto;
 }
`;

const Comment = styled.li`
  margin-bottom:7px;
  span{
    margin-right:5px;
  }
  resize: none;
`;

const Caption = styled.div`
  margin : 10px 0px;
  margin-bottom : 20px;   
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  caption,
  currentItem,
  toggleLike,
  onKeyUp,
  comments,
  selfComments
}) => (
  <Div>
  <Post>
    
    <Files>
      {files &&

        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    </Post>
  <PostComment>
    <Meta>
          <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
          </Link>
        <Location>{location}</Location>
      </UserColumn>
        </Header>
       
        <Caption><FatText text={username} /> {caption}</Caption>

      {comments && (
        <Comments className={"commentsBox"}>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <Link to={`/${comment.user.username}`}>
                  <FatText text={comment.user.username} />
                  </Link>
                {comment.text}
              </Comment>
            ))}
            {selfComments.map(comment => (
              <Comment key={comment.id}>
                 <Link to={`/${comment.user.username}`}>
                  <FatText text={comment.user.username} />
                  </Link>
                {comment.text}
              </Comment>
            ))}
          </Comments>
      )}

        <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          
        <Button>
          
          <CommentIcon />
          </Button>
          
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
         <Timestamp>{createdAt}</Timestamp>
     
         <Textarea
        placeholder={"댓글 작성 ... "}
        value={newComment.value}
        onChange={newComment.onChange}
          onKeyPress={onKeyUp} />
      </Meta>
    </PostComment>
    </Div>
);