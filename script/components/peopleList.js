import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPeople } from '../redux/actionCreators';

import { uglifyUrl } from '../utils/uglify';

import Loading from './loading';
import DateTimeTemplate from './dateTimeTemplate';
import PlanetTemplate from './planetTemplate';
import PlanetInfo from "./planetInfo";

import {
    SortingState, LocalSorting, FilteringState, LocalFiltering
} from '@devexpress/dx-react-grid';

import {
    Grid, TableView, TableHeaderRow, TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';

import { TableCell, Button } from 'material-ui';

const LookupEditCell = function(props) {

    let componentProps = {
        value: props.value,
    };

    return <TableCell>
        {
            React.cloneElement(
                props.component,
                componentProps
            )
        }
    </TableCell>

};
LookupEditCell.defaultProps = {
    value: undefined,
};

class PeopleList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            people: [],
            next: null,
            prev: null,
            count: 0,
            loading: true,

            showPlanetInfo: false,
            planetUrl:null
        };

        this.onClickBegin = this.onClickBegin.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);

        this.onClickPlanet = this.onClickPlanet.bind(this);

        this.tableCellTemplate = this.tableCellTemplate.bind(this);

        this.cellTemplate = {
            created: <DateTimeTemplate />,
            edited: <DateTimeTemplate />,
            homeworld: <PlanetTemplate onClick={this.onClickPlanet}/>
        }
    }

    componentDidMount(){
        this.props.dispatch(getPeople());
    }

    componentWillReceiveProps(props) {

        if (props.store) {

            this.setState({...this.state,
                people: props.store.results,
                next: props.store.next,
                prev: props.store.previous,
                count: props.store.count,
                loading: false,

                showPlanetInfo: !!props.planetUrl,
                planetUrl: props.planetUrl

            })

        }

    }

    onClickBegin() {

        if (this.state.prev) {
            this.setState({loading: true});
            this.props.dispatch(getPeople());
        }

    }

    onClickPrev() {

        if (this.state.prev) {
            this.setState({loading: true});
            this.props.dispatch(getPeople(this.state.prev));
        }

    }

    onClickNext () {

        if (this.state.next) {
            this.setState({loading: true});
            this.props.dispatch(getPeople(this.state.next))
        }

    }

    onClickPlanet(url) {
        this.props.history.push({pathname: '/planet/' + uglifyUrl(url)});
    }

    tableCellTemplate({row, column}) {

        if (this.cellTemplate[column.name]) {
            return <LookupEditCell
                component={this.cellTemplate[column.name]}
                value={row[column.name]}
            />
        } else {
            return undefined;
        }

    }

    render() {
        let { people, next, prev, loading, showPlanetInfo, planetUrl} = this.state;

        return (
            <div>

                <Grid
                    rows={people}
                    columns={[
                        { name: 'name',      title: 'Name',     orderable: true },
                        { name: 'height',    title: 'Height',   orderable: true },
                        { name: 'mass',      title: 'Mass',     orderable: true },
                        { name: 'created',   title: 'Create',   orderable: true },
                        { name: 'edited',    title: 'Edited',   orderable: true },
                        { name: 'homeworld', title: 'Planet',   orderable: true }
                    ]}
                >

                    <SortingState />
                    <LocalSorting />

                    <FilteringState />
                    <LocalFiltering />

                    <TableView
                        tableCellTemplate={this.tableCellTemplate}
                    />
                    
                    <TableHeaderRow allowSorting />
                    
                    <TableFilterRow />

                </Grid>

                {loading && <Loading />}

                <div className="button-container">

                    <Button className="button-begin" disabled={!prev || loading} color="primary" onClick={this.onClickBegin} >
                        Begin
                    </Button>

                    <Button className="button-prev" disabled={!prev || loading} color="primary" onClick={this.onClickPrev} >
                        Prev
                    </Button>

                    <Button className="button-next" disabled={!next || loading} color="primary" onClick={this.onClickNext} >
                        Next
                    </Button>

                </div>

                {showPlanetInfo && <PlanetInfo planetUrl={planetUrl} history={this.props.history}/>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {store: state.people};
}

export default connect(mapStateToProps)(PeopleList);