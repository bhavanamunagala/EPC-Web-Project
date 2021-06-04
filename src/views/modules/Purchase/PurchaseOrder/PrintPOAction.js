import React from "react";
import { Container, Row } from "reactstrap";
import { Printer } from "react-feather";
import ReactToPrint from "react-to-print";
import PrintPO from "./PrintPO";

class PrintPOAction extends React.Component {
  render() {
    return (
      <Container>
        <Row
          className="p-1 justify-content-end mt-1"
          style={{ backgroundColor: "#fff" }}
        >
          <ReactToPrint
            trigger={() => (
              <Printer className="cursor-pointer mr-1 text-primary" size={20} />
            )}
            content={() => this.componentRef}
            pageStyle="@page { 
                size: auto; margin: 0mm; 
              } 
              @media print { 
                body { 
                  -webkit-print-color-adjust: exact;
                   padding: 40px !important; 
                  } 
                  .table thead tr th,.table tbody tr td,.table tfoot tr td{
                    border-width: 1px !important;
                    border-style: solid !important;
                    border-color: black !important;
                   padding:10px;
                    -webkit-print-color-adjust:exact ;
                  }
                  .border{
                    border-width: 1px !important;
                    border-style: solid !important;
                    border-color: black !important;
                  }
                  .m-1{
                    margin: 1rem !important;
                  }
                  .p-1{
                    padding: 1rem !important;
                  }
                  .my-1{
                    margin-top: 1rem !important;
                    margin-bottom: 1rem !important;
                  }
                  .pl-1{
                    padding-left: 1rem !important;
                  }
                }"
          />
        </Row>
        <Row>
          <PrintPO ref={(el) => (this.componentRef = el)} />
        </Row>
      </Container>
    );
  }
}

export default PrintPOAction;
