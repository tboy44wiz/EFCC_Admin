import Select from "react-select";
import DataTable from "react-data-table-component";
import {MinimalisticMagnifer, SortVertical} from "solar-icon-set";
import DatePicker from "react-datepicker";

import tangibleTableData from "../../../../utils/TangibleTableData.json";
import {useDispatch, useSelector} from "react-redux";
import {handleInputChange} from "../../../../redux/features/auths/Auths_Slice.js";
import {searchForTangibleAsset} from "../../../../redux/services/api/Dashboard_API.js";
import { handleTangibleAssetDateChange } from "../../../../redux/features/dashboard/Dashboard_Slice.js";

const TableComp = () => {
    const { tangibleSearchString, tangibleAssetSelectedDateRange, selectedAssetType, assetTypeOptions } = useSelector(state => state.dashboardState);
    const dispatch = useDispatch();
    const [tangibleStartDate, tangibleEndDate] = tangibleAssetSelectedDateRange;

    const columns = [
        {
            name: "S/N",
            selector: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: "Asset ID",
            selector: (row) => row.assetId,
            sortable: true
        },
        {
            name: "Asset Type",
            selector: (row) => row.assetType,
            sortable: true
        },
        {
            name: "Author",
            selector: (row) => row.author,
            sortable: true,
        },
        {
            name: "Location",
            selector: (row) => row.location,
            sortable: true,
        },
        {
            name: "Creation date",
            selector: (row) => row.createdDate,
            // selector: (row) => row.created_at.split("T")[0],
            sortable: true
        }
    ];

    return (
        <section className="h-auto w-full mt-2 px-6 py-8 bg-white shadow-sm rounded-md">
            <div>
                <div className="h-auto w-full mb-2 pb-3 flex items-center justify-between border-b-2 border-gray-200">

                    {/*==== Search Input ====*/}
                    <div className="h-auto w-[300px] flex items-center justify-between bg-gray-200 text-gray-500 rounded-full pl-1 pr-4 transition-all ease-in-out duration-300
                                hover:w-[350px] focus:w-[350px]">
                        <input type="text" id="nPowerID_input" name="tangibleSearchString"
                               className="form-control w-full block bg-clip-padding bg-transparent border-none rounded-l-full font-normal text-base px-3 py-3
                                       focus:bg-transparent focus:border-gray-none focus:outline-none"
                               value={ tangibleSearchString }
                               onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                               placeholder="Search for asset" />
                        <MinimalisticMagnifer size="22" className="cursor-pointer" onClick={ () => dispatch(searchForTangibleAsset()) } />
                    </div>

                    <div className="flex items-center gap-4">
                        <Select
                            placeholder= "Asset Type"
                            options={ assetTypeOptions }
                            value={ selectedAssetType }
                            // onChange={ (selected) => handleSelectedBloodEstablishmentTypeChange(selected) }
                            className="w-[250px] form-control px-1 py-0.5  border border-gray-200 rounded text-base text-gray-500
                                focus:bg-white focus:border-gray-400 focus:outline-none"
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none"
                                }),
                            }}
                        />

                        <div className="w-auto p-2 bg-transparent border-2 rounded-[4px] text-gray-500">
                            <DatePicker
                                selectsRange={true}
                                startDate={tangibleStartDate}
                                endDate={tangibleEndDate}
                                placeholderText="Start Date - End Date"
                                onChange={ (date) => dispatch(handleTangibleAssetDateChange(date)) }
                                // className="bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={ columns }
                    data={ tangibleTableData }
                    fixedHeader={ false }
                    striped={ true }
                    highlightOnHover={ true }
                    defaultSortField="name"
                    defaultSortAsc={ true }
                    sortIcon={ <SortVertical /> }
                    responsive
                    rowNumberMode="original"
                    pagination
                />
            </div>
        </section>
    );
};

export default TableComp;
