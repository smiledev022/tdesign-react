import React from 'react';
import { Comment, IconFont, List } from '@tencent/tdesign-react';
import moment from 'moment'

const { ListItem } = List

export default function ListComment() {
  const actionTextStyle = {
    display: 'inline-block',
    marginLeft: '6px',
    lineHeight: '15px',
  }

  const actions = [
    <span key="thumbUp">
      <IconFont name="thumb-up" />
      <span style={actionTextStyle}>6</span>
    </span>,
    <span key="chat">
      <IconFont name="chat" />
      <span style={actionTextStyle}>回复</span>
    </span>
  ]

  const commentsData = [
    {
      id: 'A',
      avatar: "https://tdesign.gtimg.com/list-icon.png",
      author: "评论作者名A",
      datetime: moment().format('MM[月]DD[日] HH:mm'),
      content: "A评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容。",
      actions,
    },
    {
      id: 'B',
      avatar: "https://tdesign.gtimg.com/list-icon.png",
      author: "评论作者名B",
      datetime: moment().format('MM[月]DD[日] HH:mm'),
      content: "B评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容。",
      actions,
    },
    {
      id: 'C',
      avatar: "https://tdesign.gtimg.com/list-icon.png",
      author: "评论作者名C",
      datetime: moment().format('MM[月]DD[日] HH:mm'),
      content: "C评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容。",
      actions,
    }
  ]

  return (
    <List>
      {
        commentsData.map((item) => (
          <ListItem key={item.id}>
            <Comment
              avatar={item.avatar}
              author={item.author}
              datetime={item.datetime}
              content={item.content}
              actions={actions}
            />
          </ListItem>
        ))
      }
    </List>
  );
}
