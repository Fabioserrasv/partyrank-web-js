'use client'
import { useTheme } from '@/context/ThemeContext';
import { getUserImageUrlPath, generatePlaceholderUsers } from "@/lib/utils";
import Image from "next/image";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import './user-table.scss';

type UsersTableProps = {
  users: User[];
  itemsPerPage?: number;
}

type handlePageClickProps = {
  selected: number;
}

export function UsersTable({ users, itemsPerPage = 5 }: UsersTableProps) {
  const { isDarkMode } = useTheme();
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<User[]>(users.slice(itemOffset, (itemOffset + itemsPerPage)));
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = ({ selected }: handlePageClickProps) => {
    const newOffset = (selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const slicedUsers = users.slice(itemOffset, endOffset);
    const usersWithPlaceholders = [...slicedUsers];
    generatePlaceholderUsers(usersWithPlaceholders, itemsPerPage);
    setCurrentItems(usersWithPlaceholders);
  }, [users, itemOffset, itemsPerPage]);

  return (
    <>
      <Table style={{ width: '40%' }} striped variant={isDarkMode ? 'dark' : 'light'}>
        <tbody>
          {currentItems && currentItems.length > 0 ? currentItems.map((u) => {
            return (
              u.isPlaceholder ? (
                <tr key={u.id}>
                  <td height={130}></td>
                  <td height={130}></td>
                </tr>
              ) : (
                <tr key={u.id}>
                  <td>
                    <Image width={120} height={120} src={getUserImageUrlPath(u.imageUrl!)} alt="" />
                  </td>
                  <td>
                    <div className='d-flex align-items-center username-td flex-column'>
                      <span>{u.username}</span>
                      <span>Average: {u.average}</span>
                    </div>
                  </td>
                </tr>
              )
            )
          }) : (
            <tr>
              <td colSpan={2}>Nenhum usuário encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
      {pageCount > 1 && (
        <div className='d-flex justify-content-center mt-3'>
          <Pagination>
            {Array.from({ length: pageCount }, (_, index) => (
              <Pagination.Item 
                key={index} 
                active={index === itemOffset / itemsPerPage} 
                onClick={() => handlePageClick({ selected: index })}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </>
  )
}

