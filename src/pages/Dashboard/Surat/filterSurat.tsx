import {FormInput, FormLabel} from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import {BaseModal} from "@/components/Modals/Modals";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useAppDispatch} from "@/stores/hooks";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {setFilterSurat} from "@/stores/apps/filterSuratSlice";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {json} from "react-router-dom";

interface IFilterSurat {
    isModal: boolean;

    handleCancel(): void;
}

const schema = yup
    .object({
        tanggal_masuk: yup.string().notRequired(),
        nomor_agenda: yup.string().notRequired(),
        disposisi: yup.string().notRequired(),
        posisi_surat: yup.string().notRequired(),
    })
    .required();
type FormData = yup.InferType<typeof schema>;
export default function FilterSurat(props: IFilterSurat) {

    const {
        register, formState: {errors}, handleSubmit, control, reset, watch, setValue, setError,
    } = useForm<FormData>({
        mode: "onChange", resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    function handleFilterSurat(data: FormData) {

        dispatch(setFilterSurat({
            filter: {
                ...data
            }
        }))
        props.handleCancel()
    }
    const filterSurat = useSelector((state: RootState) => state.filterSurat);

    useEffect(() => {
        setValue('posisi_surat', filterSurat.filter.posisi_surat)
        setValue('disposisi', filterSurat.filter.disposisi)
        setValue('tanggal_masuk', filterSurat.filter.tanggal_masuk)
        setValue('nomor_agenda', filterSurat.filter.nomor_agenda)
    },[filterSurat])
    return (<BaseModal
            {...{
                ...props, title: "Filter Surat", handleSubmit, submitCallback: handleFilterSurat, control, size: "md",
            }}
        >
            <div className="grid grid-cols-12 px-8 py-4 gap-4 max-h-[450px] overflow-y-auto">
                {/*<div className="col-span-12">*/}
                {/*    <FormLabel htmlFor="tanggal_masuk">Tanggal Masuk</FormLabel>*/}
                {/*    <Controller*/}
                {/*        render={({field: {onChange, value}}) => (<Litepicker*/}
                {/*                value={value}*/}
                {/*                onChange={onChange}*/}
                {/*                options={{*/}
                {/*                    autoApply: false,*/}
                {/*                    singleMode: true,*/}
                {/*                    numberOfColumns: 1,*/}
                {/*                    numberOfMonths: 1,*/}
                {/*                    showWeekNumbers: true,*/}
                {/*                    format: "YYYY-MM-DD",*/}
                {/*                    dropdowns: {*/}
                {/*                        minYear: 2023, maxYear: null, months: true, years: true,*/}
                {/*                    },*/}
                {/*                }}*/}
                {/*                className="block  mx-auto"*/}
                {/*            />)}*/}
                {/*        name="tanggal_masuk"*/}
                {/*        control={control}*/}
                {/*        defaultValue={undefined}*/}
                {/*    />*/}
                {/*    <div className="text-danger font-semibold text-xs mt-2">*/}
                {/*        {errors.tanggal_masuk?.message}*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="col-span-12">
                    <FormLabel htmlFor="nomor_agenda">
                        Nomor Agenda
                    </FormLabel>
                    <FormInput type="text" {...register("nomor_agenda")} />
                    <div className="text-danger font-semibold text-xs mt-2">
                        {errors?.nomor_agenda?.message}
                    </div>
                </div>


                <div className="col-span-12">
                    <FormLabel htmlFor="posisi_surat">
                        Posisi Surat
                    </FormLabel>
                    <FormInput type="text" {...register("posisi_surat")} />
                    <div className="text-danger font-semibold text-xs mt-2">
                        {errors?.posisi_surat?.message}
                    </div>
                </div>


                <div className="col-span-12">
                    <FormLabel htmlFor="disposisi">Disposisi</FormLabel>
                    <FormInput type="text" {...register("disposisi")} />
                    <div className="text-danger font-semibold text-xs mt-2">
                        {errors?.disposisi?.message}
                    </div>
                </div>

            </div>
        </BaseModal>);
}
