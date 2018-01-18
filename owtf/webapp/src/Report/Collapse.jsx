import React, { Component, PropTypes } from 'react';
import RankButtons from './RankButtons.jsx';
import Table from './Table.jsx';

/**
  * React Component for Accordian's collapse. It is child component used by Accordian Component.
  * This is collapse that opens on either clicking plugin_type buttons or Accordian heading.
  */

class Collapse extends Component {

    render() {
        let plugin = this.props.plugin;
        let pluginData = this.props.pluginData;
        let selectedType = this.context.selectedType;
        let selectedRank = this.context.selectedRank;
        let selectedGroup = this.context.selectedGroup;
        let selectedOwtfRank = this.context.selectedOwtfRank;
        let selectedStatus = this.context.selectedStatus;
        let pactive = this.props.pactive;
        return (
            <div id={plugin['code']} className="panel-collapse collapse">
                <div className="panel-body">
                    <ul className="nav nav-tabs">
                        <li className="brand disabled">
                            <a className="btn" disabled="disabled">Type:</a>
                        </li>
                        {pluginData.map(function(obj) {
                            if ((selectedType.length === 0 || selectedType.indexOf(obj['plugin_type']) !== -1) && (selectedGroup.length === 0 || selectedGroup.indexOf(obj['plugin_group']) !== -1) && (selectedRank.length === 0 || selectedRank.indexOf(obj['user_rank']) !== -1) && (selectedOwtfRank.length === 0 || selectedOwtfRank.indexOf(obj['owtf_rank']) !== -1) && (selectedStatus.length === 0 || selectedStatus.indexOf(obj['status']) !== -1)) {
                                let pkey = obj['plugin_type'] + '_' + obj['plugin_code'];
                                return (
                                    <li key={pkey} className={pactive === obj['plugin_type']
                                        ? "active"
                                        : ""}>
                                        <a href={"#" + obj['plugin_group'] + '_' + obj['plugin_type'] + '_' + obj['plugin_code']} data-toggle="tab">
                                            {obj['plugin_type'].split('_').join(' ')}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                        <li className="pull-right">
                            <a href={plugin['url']} target="_blank" title="More information">
                                <i className="fa fa-lightbulb-o"></i>
                            </a>
                        </li>
                    </ul>
                    <br/>
                    <div className="tab-content">
                        {pluginData.map(function(obj) {
                            if ((selectedType.length === 0 || selectedType.indexOf(obj['plugin_type']) !== -1) && (selectedGroup.length === 0 || selectedGroup.indexOf(obj['plugin_group']) !== -1) && (selectedRank.length === 0 || selectedRank.indexOf(obj['user_rank']) !== -1)) {
                                let pkey = obj['plugin_type'] + '_' + obj['plugin_code'];
                                return (
                                    <div className={pactive === obj['plugin_type']
                                        ? "tab-pane active"
                                        : "tab-pane"} id={obj['plugin_group'] + '_' + obj['plugin_type'] + '_' + obj['plugin_code']} key={"tab" + pkey}>
                                        <div className="pull-left" data-toggle="buttons-checkbox">
                                            <blockquote>
                                                <h4>{obj['plugin_type'].split('_').join(' ').charAt(0).toUpperCase() + obj['plugin_type'].split('_').join(' ').slice(1)}</h4>
                                                <small>{obj['plugin_code']}</small>
                                            </blockquote>
                                        </div>
                                        <div data-toggle="buttons">
                                            <br/>
                                            <RankButtons obj={obj}/>
                                        </div>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <Table obj={obj}/>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default Collapse;
