import React from 'react';

const RequestTable = () => {
    return (
      <table className="table">
        {/* head */}
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Request status</th>
            <th>Requested Time</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="text-center">
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>Purple</td>
            <td>Purple</td>
            <th className="space-x-2">
              <button className="btn bg-green-400 text-black font-semibold hover:bg-green-600 btn-xs">
                Accept
              </button>
              <button className="btn bg-base-300 font-semibold hover:bg-base-300/80 btn-xs">
                Reject
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    );
};

export default RequestTable;