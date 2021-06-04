import React from "react";
import { Input } from "reactstrap";
import { Search } from "react-feather";

export const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="position-relative has-icon-left ">
        <Input
          bsSize="sm"
          value={props.value}
          onChange={(e) => props.handleFilter(e)}
          placeholder="Search..."
          className="pl-2"
        />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};
