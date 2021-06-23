import React from "react";
import { useSelector } from "react-redux";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  OverflowMenu,
  OverflowMenuItem,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
} from "carbon-components-react";

/*
  Confirmation Table Render

  Renders the table containing the vaccination records passed to the component
  
*/

const ConfirmTable = ({
  approvePatient,
  rows,
  headers,
  setOpenRegistrationModal,
  schedulePatient,
  viewDetails,
}) => {
  const user = useSelector((state) => state.authenticatedUser);

  //Return Boolean baseed on approval status and role
  //Used to enable/disable approval overflow menu item
  const getApprovalStatus = (patient) => {
    const request = patient.filter(
      (value) => value.info.header === "request"
    )[0];

    return request.value === "Pending" && user.role !== 0;
  };

  //Return Boolean baseed on approval status and role
  //Used to enable/disable schedule overflow menu item
  const getScheduleStatus = (patient) => {
    const request = patient.filter(
      (value) => value.info.header === "request"
    )[0];

    return request.value === "Approved" && user.role !== 0;
  };

  return (
    <DataTable
      rows={rows}
      headers={headers}
      isSortable
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        onInputChange,
      }) => (
        <TableContainer
          title="Vaccine Requests"
          description="A tabled list of vaccination requests"
        >
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
              <TableToolbarMenu light>
                <TableToolbarAction>Action 1</TableToolbarAction>
                <TableToolbarAction>Action 2</TableToolbarAction>
                <TableToolbarAction>Action 3</TableToolbarAction>
              </TableToolbarMenu>

              {user.role !== 0 && (
                <Button onClick={setOpenRegistrationModal}>
                  Register Patient
                </Button>
              )}
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}

                    <TableCell className="bx--table-column-menu">
                      <OverflowMenu size="sm" light flipped>
                        <OverflowMenuItem
                          disabled={!getApprovalStatus(row.cells)}
                          itemText="Approve"
                          onClick={() => approvePatient(row.id)}
                        />
                        <OverflowMenuItem
                          disabled={!getScheduleStatus(row.cells)}
                          itemText="Schedule"
                          onClick={() => schedulePatient(row.id)}
                        />

                        <OverflowMenuItem
                          itemText="View Details"
                          onClick={() => viewDetails(row.id)}
                        />
                      </OverflowMenu>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

export default ConfirmTable;
