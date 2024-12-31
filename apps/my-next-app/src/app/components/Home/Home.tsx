"use client"
import { Space, Table, TableProps } from 'antd';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

export default function Home() {
  const { characterList, pagination, loading, updatePagination, applyFilters } = useCharacterList();
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    status: z.string().optional(),
    species: z.string().optional(),
    gender: z.string().optional(),
    // species: z.enum(["Human", "Alien" , "Mythological Creature"], {
    //   errorMap: () => ({ message: "Gender is invalid. Choose from Male, Female" }),
    // }).optional(),
    // gender: z.enum(["Male", "Female"], {
    //   errorMap: () => ({ message: "Gender is invalid. Choose from Male, Female" }),
    // }).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSearchInput>({
    resolver: zodResolver(schema),
  });



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
            dataSource={characterList}
            loading={loading}
            pagination={pagination}
            onChange={handlePaginationChange}
          />
        </>
      )}
    </>
  );
}
