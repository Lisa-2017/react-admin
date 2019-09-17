import React, {Component} from 'react'
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import ProtoTypes from 'prop-types';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';

class RichTextEditor extends Component {
  static propType ={
    detail:ProtoTypes.string.isRequired
  }

  constructor(props){
    super(props);
    const {detail} = this.props
    let editorState;

    if(detail){
      const blocksFromHtml = htmlToDraft(this.props.detail);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      editorState = EditorState.createWithContent(contentState);
    }else{
      editorState= EditorState.createEmpty();
    }

    this.state = {
      editorState
    }

  }


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;

        return (
            <div>
                <Editor
                    editorState={editorState}
                    // wrapperClassName="demo-wrapper"
                    editorClassName="rich-text-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea  disabled   value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />*/}
            </div>
        )
    }
}

export default RichTextEditor;