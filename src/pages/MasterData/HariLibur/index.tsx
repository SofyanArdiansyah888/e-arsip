import { Draggable } from "@fullcalendar/interaction";
import "@fullcalendar/react/dist/vdom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Button from "@/base-components/Button";
import { Draggable as FullCalendarDraggable } from "@/base-components/Calendar";
import Lucide from "@/base-components/Lucide";
import Calendar from "@/components/Calendar";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { JadwalLiburEntity } from "@/models/JadwalLibur.entity";
import { CreateHariLibur } from "./CreateHariLibur";
import { formatDate } from "@/utils/helper";
import { useAppDispatch } from "@/stores/hooks";
import { setNotification } from "@/stores/apps/notificationSlice";
import { DeleteModal } from "@/components/Modals/Modals";
import { EditHariLibur } from "./EditHariLibur";

function HariLibur() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
    JadwalLiburEntity | undefined
  >();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();
  const { mutate } = useDelete({
    name: "hari-liburs",
    endpoint: `jadwal-liburs/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Jadwal Libur",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  const { data: payload, isLoading } = useGet<GetPayload<JadwalLiburEntity>>({
    name: "hari-liburs",
    endpoint: "jadwal-liburs",
    page: page + 1,
    limit,
  });

  const dragableOptions: Draggable["settings"] = {
    itemSelector: ".event",
    // eventData(eventEl) {
    //   const getDays = () => {
    //     const days = eventEl.querySelectorAll(".event__days")[0]?.textContent;
    //     return days ? days : "0";
    //   };
    //   return {
    //     title: eventEl.querySelectorAll(".event__title")[0]?.innerHTML,
    //     duration: {
    //       days: parseInt(getDays()),
    //     },
    //   };
    // },
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Calendar</h2>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5">
        {/* BEGIN: Calendar Side Menu */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-4">
          <div className="p-5 box intro-y">
            <Button
              variant="primary"
              type="button"
              className="w-full mt-2"
              onClick={() => setCreateModal(true)}
            >
              <Lucide icon="Edit3" className="w-4 h-4 mr-2" /> Tambahkan Libur
            </Button>
            {isLoading && (
              <div className="py-4 w-full text-center font-semibold text-lg bg-slate-200 mt-4 rounded-md">
                Loading ...
              </div>
            )}
            <FullCalendarDraggable
              id="calendar-events"
              options={dragableOptions}
              className="py-3 mt-6 mb-5 border-t border-b border-slate-200/60 dark:border-darkmode-400"
            >
              {payload?.data.map((hariLibur) => (
                <div className="relative">
                  <div className="flex items-center p-3 -mx-3 transition duration-300 ease-in-out rounded-md cursor-pointer event hover:bg-slate-100 dark:hover:bg-darkmode-400">
                    <div className="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                    <div className="pr-10">
                      <div className="truncate event__title capitalize max-w-xs break-words">
                        {hariLibur.deskripsi}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        <span className="event__days">
                          {formatDate(hariLibur.mulai)}
                        </span>{" "}
                        -{" "}
                        <span className="event__days">
                          {formatDate(hariLibur.selesai)}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="my-2 mx-1"
                        onClick={() => {
                          setEditModal(true);
                          setSelectedItem(hariLibur);
                        }}
                      >
                        <Lucide icon="Pencil" className="w-3 h-3"></Lucide>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="my-2 mx-1"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedItem(hariLibur);
                        }}
                      >
                        <Lucide icon="X" className="w-3 h-3 "></Lucide>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {payload?.data.length === 0 && <div className="bg-zinc-100 rounded-xl p-4 text-center font-semibold ">No Data...</div>}
            </FullCalendarDraggable>
            <ReactPaginate
              nextLabel="next"
              onPageChange={(data) => setPage(data.selected)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={payload?.meta?.last_page}
              previousLabel="prev"
              pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="capitalize px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
              nextClassName="capitalize px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
              breakLabel="..."
              breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              containerClassName="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap "
              activeClassName="px-3 py-2 text-slate-100 border border-gray-300 bg-slate-700 hover:bg-slate-600 "
              renderOnZeroPageCount={undefined}
            />
          </div>
        </div>
        {/* END: Calendar Side Menu */}
        {/* BEGIN: Calendar Content */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-8">
          <div className="p-5 box">
            <Calendar events={payload?.data} />
          </div>
        </div>
        {/* END: Calendar Content */}
      </div>
      <CreateHariLibur
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />
      <EditHariLibur
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
      <DeleteModal
        isModal={deleteModal}
        handleConfirm={() => mutate({})}
        handleCancel={() => setDeleteModal(false)}
        title={selectedItem?.deskripsi}
      />
    </>
  );
}

export default HariLibur;
