'use client'
import { useTheme } from '@/context/ThemeContext';
import { getUserImageUrlPath } from "@/lib/utils";
import Image from "next/image";
import Table from 'react-bootstrap/Table';
import './user-table.scss';

type UsersTableProps = {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const { isDarkMode } = useTheme();

  return (
    <Table style={{ width: '40%' }} striped variant={isDarkMode ? 'dark' : 'light'}>
      <tbody>
        {users && users.length > 0 ? users.map((u) => {
          return (
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
        }) : (
          <tr>
            <td colSpan={2}>Nenhum usuário encontrado</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

