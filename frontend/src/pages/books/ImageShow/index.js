import React, { Component } from 'react';
import { Content } from '../../books/style';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import Upload from '../../../components/Upload';
import FileList from '../../../components/FileList'
import api from '../../../services/api';

class ImageShow extends Component {
  state = {
    uploadedFiles: [],
  };
  
  async componentDidMount(){
    const response = await api.get('/files');

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file.id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      }))
    })
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,

    }))

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    })

    uploadedFiles.forEach(this.processUpload);
  }

  updateFile = (id, data) => {
    this.setState({uploadedFiles: this.state.uploadedFiles.map(uploadedFile => 
      {
       return id === uploadedFile.id ? { ...uploadedFile, ...data} 
        : uploadedFile;
      }
    )})
  };
  
  processUpload = (uploadedFile) => {
    const data = new FormData();
    
    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('files', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100)/e.total));

        this.updateFile(uploadedFile.id, {
          progress,
        })
      }
    }).then(response => {
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id, /* colocar underline na frente caso seja mongodb*/
        url: response.data.url
      })
    }).catch(( ) => {
      this.updateFile(uploadedFile.id,{
        error: true,
      })
    })
  }
    
  handleDelete = async id=> {
    await api.delete(`/files/${id}`);
 
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
    })
  }

  componentWillUnmount(){
    this.state.uploadedFiles.forEach(file => 
      URL.revokeObjectURL(file.preview))
  }

  render() {
    const {uploadedFiles } = this.state;

    
    return (
    <>
      <Content>
        <Upload onUpload = {this.handleUpload}/> 
        { !! uploadedFiles.length && (
          <FileList files = {uploadedFiles} onDelete = {this.handleUpload}/>
        )}
      </Content>
    </>
    )}
  }

export default ImageShow;
