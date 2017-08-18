import React from 'react';

const ModalList = (props) => {
  return (
    <div className="block_view">
      <div className="">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th> # </th>
            </tr>
          </thead>
          <tbody>
          {
            props.vehicleArray.map((item) => {
              return(<tr key={ item._id }>
                <td>{ item.numberPlace }</td>
                <td>{ item.brand }</td>
                <td>{ item.model }</td>
                <td>{ item.year }</td>
                <td><button onClick={() => props.OnClickSelect(item._id)} type="button"><i className="fa fa-wrench" aria-hidden="true"></i></button></td>
              </tr>
            )
          })
        }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModalList;
