"use client"
import { Space, Table, TableProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  EmptyResult,
  StyledButton,
  StyledButtonContainer,
  StyledError,
  StyledForm,
  StyledInput,
  StyledInputWithError, StyledSelect
} from './styles';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useCharacterList } from '../../hooks/useCharacterList';

export interface CharacterType {
  key: string;
  id: number;
  name: string;
  image: string;
  status: string;
  gender:string;
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
  gender:string;
}
export type ValidFieldNames =
  | "name"
  | "status"
  | "species"
  | "gender"
const columns: TableProps<CharacterType>['columns'] = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (text) => {
      return  <Image alt={text} src={text} width={50} height={50}/>
    },
    width: '15%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return  <div>{text}</div>
    },
    width: '15%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: '15%',
  },
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species',
    width: '15%',
  },
  {
    title: 'Action',
    key: 'action',
    width: '15%',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/character/${record.id}`}>Show Detail</Link>
      </Space>
    ),
  },
];
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().optional(),
  species: z.string().optional(),
  gender: z.string().optional(),
});
export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const queryString = new URLSearchParams({ ...filterParams, page: String(currentPage), pageSize: String(pageSize) }).toString();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSearchInput>({
    resolver: zodResolver(schema),
  });
  const { isLoading, characterList , error } = useCharacterList(queryString);
  useEffect(() => {
    if (characterList?.results?.length > 0) {
      const temp = characterList.results.map((character: CharacterType) => ({
        ...character,
        key: character.id.toString(),
      }))
      setTableData(temp);
    }
  }, [characterList]);
  if (isLoading) {
    return  'Loading.....'
  }
  if (error) {
    return 'An Error occurred! try again'
  }

  async function handleSubmitBtn(data: FormSearchInput) {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value.trim() !== '')
    );
    setFilterParams(filteredData)
  }
  return (
    <>
      <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
        <StyledInputWithError>
          <StyledInput
            {...register('name')}
            placeholder="Name"
          />
          {errors.name && <StyledError>{errors.name.message}</StyledError>}

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
          <StyledSelect {...register('gender')}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </StyledSelect>
        </StyledInputWithError>
        <StyledInputWithError>
          <StyledSelect {...register('species')}>
            <option value="">Select Species</option>
            <option value="Human">Human</option>
            <option value="Mythological Creature">Mythological Creature</option>
            <option value="Alien">Alien</option>
          </StyledSelect>
        </StyledInputWithError>

        <StyledButtonContainer>
          <StyledButton
            type="reset"
            value="Reset"
            onClick={() => {
              setFilterParams({})
            }}
          />
          <StyledButton type="submit" value="Submit" />
        </StyledButtonContainer>

      </StyledForm>
      {characterList?.results?.length == 0 && <EmptyResult>No Data was found!</EmptyResult>}
      {characterList?.results?.length > 0 && (
        <>
          <Table<CharacterType>
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={{
              total: characterList?.info?.count,
              current: currentPage,
              pageSize,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize || 20);
              },
            }}
          />
        </>
      )}
    </>
  );
}
