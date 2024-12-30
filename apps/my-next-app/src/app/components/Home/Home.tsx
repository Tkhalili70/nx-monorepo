"use client"
import { Space, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useCharacterList } from '../../hooks/useCharacterList';
import {
  EmptyResult,
  StyledButton,
  StyledButtonContainer,
  StyledError,
  StyledForm,
  StyledInput,
  StyledInputWithError, StyledSelect
} from './styles';


export interface CharacterType {
  key: string;
  id: number;
  name: string;
  image: string;
  status: string;
  url:string;
  location: {
    name: string;
    url:string;
  };
  origin: {
    name: string;
    url:string;
  };
  species:string;
  episode: string[];
}


interface FormSearchInput {
  name: string;
  status: string;
  species:string;
}
export default function Home() {
  const { characterList, pagination, loading, updatePagination, applyFilters } = useCharacterList();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSearchInput>();



  const columns: TableProps<CharacterType>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => {
        return  <Image alt={text} src={text} width={50} height={50}/>
      },
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return  <div>{text}</div>
      },
      width: '20%',
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          {/*<a>Invite {record.name}</a>*/}
          <Link href={`/character/${record.id}`}>Show Detail</Link>
        </Space>
      ),
    },
  ];

  async function handleSubmitBtn(data: FormSearchInput) {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value.trim() !== '')
    );
    updatePagination(1, 20);
    applyFilters(filteredData);

  }

  const handlePaginationChange = (pagination: any) => {
    console.log(pagination , 'pagination')
    updatePagination(pagination.current, pagination.pageSize);
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
        <StyledInputWithError>
          <StyledInput
            {...register('name', { required: true })}
            placeholder="Name"
          />
          {errors.name && <StyledError>Name is required.</StyledError>}
        </StyledInputWithError>
        <StyledInputWithError>
          <StyledSelect {...register('status')}>
            <option value="">Select Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </StyledSelect>
        </StyledInputWithError>

        <StyledInputWithError>
          <StyledInput {...register('species')} placeholder="Species" />
        </StyledInputWithError>
        <StyledButtonContainer>
          <StyledButton
            type="reset"
            value="Reset"
            onClick={() => {
              updatePagination(1, 20);
              applyFilters({})
            }}
          />
          <StyledButton type="submit" value="Submit" />
        </StyledButtonContainer>
      </StyledForm>
      {characterList.length == 0 && <EmptyResult>No Data was found!</EmptyResult>}
      {characterList.length > 0 && (
        <>
          <Table<CharacterType>
            columns={columns}
            dataSource={characterList || []}
            loading={loading}
            pagination={pagination}
            onChange={handlePaginationChange}
          />
        </>
      )}
    </>
  );
}
