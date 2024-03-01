"use client";
import React, { Fragment, useState } from 'react'
import Checkbox from './Checkbox/Checkbox';
import Image from 'next/image';
import { extractDateTime } from '../helpers/ExtractDateTime';
import Button from './Button';
import Link from 'next/link';
import { handleAlert, handleConfirm, handlePrompt } from "../helpers/alertify";
import { userDelete, userDeleteSelected, userEdit } from '../utils/users';

const tableClass = {
  col_1: "flex-none min-h-[50px] min-w-[50px] w-[60px] flex items-center p-4",
  col_2: "flex-1 p-4 flex items-center text-300 gap-x-3 min-w-[300px]",
  col_3: "flex-none w-[200px] p-4 flex items-center",
  col_4: "flex-none w-[200px] p-4 flex items-center",
  col_5: "flex-none w-[200px] p-4 flex items-center",
  col_6: "flex-none flex items-center p-4 min-w-[250px]",
}

const Table = ({ data, setUserList }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [selectArr, setSelectArr] = useState([]);
  return (
    <div className='border-2 border-[#ddd] rounded-lg'>
          {/* thead */}
      <div>
        {/* row */}
        <div className={`flex text-lg font-medium px-2 text-200 border-b border-[#ddd]`}>
          <div className={`${tableClass.col_1}`}>
            <Checkbox data={data} checkAll={checkAll} setCheckAll={setCheckAll} selectArr={selectArr} setSelectArr={setSelectArr} />
          </div>
          <div className={`${tableClass.col_2}`}>
            Tên tài khoản
          </div>
          <div className={`${tableClass.col_4}`}>
            <p className='mx-auto'>
              created at 
            </p>
          </div>
          <div className={`${tableClass.col_5}`}>
            <p className='mx-auto'>
              updated at 
            </p>
          </div>
          <div className={`${tableClass.col_6}`}>
            <p className='mx-auto'>
              Hành động 
            </p>
          </div>
        </div>
      </div>
      {/* tbody */}
      <div>
        {
          data.length > 0 ? data.map((item, index) => {
            return <Fragment key={item.id}>
              <div className={`flex text-lg font-medium px-2 text-200`}>
                <div className={`${tableClass.col_1}`}>
                  <Checkbox 
                    id={item.id} 
                    selected={selectArr.length > 0 && selectArr.includes(item.id) ? true : false} 
                    selectArr={selectArr} 
                    setSelectArr={setSelectArr} 
                    data={data}  
                    setCheckAll={setCheckAll}
                  />
                </div>
                <div className={`${tableClass.col_2}`}>
                  <div className='max-w-[150px] w-[50px] h-[50px] max-h-[auto] shadow-md relative'>
                    <Link href={`/${item.id}`}>
                      {item.thumbnail && ( 
                      <Image
                        src={item.thumbnail}
                        layout="fill"
                        objectFit="cover" 
                        alt={item.name}
                        className='mx-auto'
                        sizes='100%'
                      /> )
                      }
                    </Link>
                  </div>
                  <Link href={`/${item.id}`}>
                    <p>{ item.name }</p>
                  </Link>
                </div>
                <div className={`${tableClass.col_4} break-words max-w-[200px] text-center`}>
                  <p>{extractDateTime(item.created_at)}</p>
                </div>
                <div className={`${tableClass.col_5} break-words max-w-[200px] text-center`}>
                <p>{extractDateTime(item.updated_at)}</p>
                </div>
                <div className={`${tableClass.col_6} flex gap-2 justify-center items-center`}>
                  <button 
                    type='button' 
                    className='py-2 px-4 bg-yellow-400 rounded-md'
                    onClick={() => {
                      handlePrompt(
                        "Bạn có thể sửa tên.", 
                        item.name, 
                        async function(evt, value ){
                          const edit = await userEdit(localStorage.accessToken, {
                            id: item.id,
                            name: value
                          })
                          if (edit) {
                            setUserList((state) => {
                              return state.map(i => {
                                if (i.id === item.id) {
                                  return {
                                    ...i,
                                    name: value
                                  }
                                }
                                return i
                              })
                            })
                            handleAlert("success", edit.message)
                          } else {
                            handleAlert("error", edit.message)
                          }
                        },
                        function(){
                          handleAlert("error", "Cancel")
                        }
                      )                  
                    }}
                  >
                    sửa
                  </button>
                  <button 
                    type='button' 
                    className='py-2 px-4 bg-red-600 rounded-md'
                    onClick={() => {
                      handleConfirm(
                        "Bạn chắc chắn muốn xóa?",
                        async function(){
                          const deleted = await userDelete(localStorage.accessToken, item.id);
                          if (deleted) {
                            setUserList((state) => {
                              return state.filter(i => i.id !== item.id)
                            });
                            handleAlert("success", deleted.message)
                          } else {
                            handleAlert("error", deleted.message)
                          }
                        },
                        function(){
                          handleAlert("error", 'Cancel');
                        },
                        "Xóa",
                      );
                    }}
                  >
                    xóa
                  </button>
                </div>
              </div>
            </Fragment>
          }) : (
            <div className='p-4 text-center text-xl'>
              <p>Không có dữ liệu</p>
            </div>
          )
        }
      </div>
      {/* footer */}
      {
        selectArr.length > 0 && (
          <div>
            <div className=' border-t-2'>
              <div className={`flex text-lg font-medium text-200`}>
                <div className={`flex-none min-h-[50px] min-w-[50px] w-[60px] flex items-center p-2`}>
                  <button 
                    className='bg-red-600 p-3 text-white rounded-md'
                    onClick={() => {
                      handleConfirm(
                        "Bạn chắc chắn muốn xóa tài khoản đã chọn?",
                        async function(){
                          const deleted = await userDeleteSelected(localStorage.accessToken, selectArr);
                          if (deleted) {
                            setUserList((state) => {
                              return state.filter(i => {
                                const deleted = selectArr.find(d => d === i.id);
                                return !deleted;
                              })
                            });
                            setSelectArr([]);
                            console.log(deleted.message);
                            handleAlert("success", deleted.message);
                          } else {
                            handleAlert("error", deleted.message);
                          }
                        },
                        function(){
                          handleAlert("error", 'Cancel');
                        },
                        "Xóa",
                      );
                    }}
                  >Xóa</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Table