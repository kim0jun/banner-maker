import * as React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './style.css';

export interface ImageInfoViewProps {
  sqLength: number;
  imageSize: number;
}

export default class ImageInfoView extends React.Component<ImageInfoViewProps, any> {
  public render() {
    return (
      <Table className={'image-info-table'} style={{width: '300px'}}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>key</TableHeaderColumn>
          <TableHeaderColumn>value</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>frameLength</TableRowColumn>
          <TableRowColumn>{this.props.sqLength}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Mb</TableRowColumn>
          <TableRowColumn>{Math.floor(this.props.imageSize / 1000)}Mb</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>kb</TableRowColumn>
          <TableRowColumn>{this.props.imageSize}kb</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
    );
  }
}
