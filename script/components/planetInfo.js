import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPlanetInfo } from '../redux/actionCreators';

import { unuglifyUrl } from '../utils/uglify';

import Loading from './loading';

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button,
    Table, TableHead, TableBody, TableRow, TableCell
} from 'material-ui';

class PlanetInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            planetUrl: unuglifyUrl(props.planetUrl),
            loading: true
            
        };

        this.onClickClose = this.onClickClose.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getPlanetInfo(this.state.planetUrl));
    }

    componentWillReceiveProps(props) {

        if (props.store) {

            this.setState({
                ...props.store,
                loading: false
            })

        }
    }

    onClickClose() {

        this.props.history.goBack();

    }

    render() {
        let state = this.state;

        return (
            <div>

                <Dialog
                    className="planet-info-dialog"
                    ignoreBackdropClick
                    ignoreEscapeKeyUp
                    fullWidth={true}
                    open={true}
                    onEscapeKeyUp={this.onClickClose}
                >
                    <DialogTitle>Planet Info</DialogTitle>

                    <DialogContent >

                        {
                            !state.loading && <Table className={state.loading ? 'hide' : ''}>

                                <TableBody>

                                    <TableRow>

                                        <TableCell>
                                            Name
                                        </TableCell>

                                        <TableCell>
                                            {state.name}
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>

                                        <TableCell>
                                            Diameter
                                        </TableCell>

                                        <TableCell>
                                            {state.diameter}
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>

                                        <TableCell>
                                            Climate
                                        </TableCell>

                                        <TableCell>
                                            {state.climate.charAt(0).toUpperCase() + state.climate.slice(1)}
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>

                                        <TableCell>
                                            Population
                                        </TableCell>

                                        <TableCell>
                                            {state.population}
                                        </TableCell>

                                    </TableRow>

                                </TableBody>

                            </Table>
                        }

                        { state.loading && <Loading /> }

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.onClickClose} color="primary">
                            OK
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {store: state.planet};
}

export default connect(mapStateToProps)(PlanetInfo);