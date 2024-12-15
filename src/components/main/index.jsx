import {Modal} from "antd";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {deleteData, editData, getData} from "../../redux/todoSlice";
import {FaEdit} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";

function MainComp() {
	let [editingItem, setEditingItem] = useState(null);
	let state = useSelector((state) => state.todoSlice);
	let dispatch = useDispatch();
	let [searchText, setSearchText] = useState("");
	let searchRefInput = useRef();

	let searchFunc = (e) => {
		setSearchText(e.target.value);
	};

	let filteredData = state.data.filter((value) =>
		value.payload.text.text.toLowerCase().includes(searchText.toLowerCase())
	);

	// ----------------------------------------------

	let editRefInput = useRef();

	const showModal = (id) => {
		let item = state.data.find((item) => item.payload.id === id);
		setEditingItem(item);
	};

	const handleOk = () => {
		let editInput = editRefInput.current?.value;
		editRefInput.current.value = "";
		if (editInput) {
			dispatch(editData({id: editingItem.payload.id, text: editInput}));
		}
		setEditingItem(null);
	};
	const handleCancel = () => {
		setEditingItem(null);
	};

	// ----------------------------------------------

	let {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm();

	let onSubmit = (text) => {
		dispatch(getData({id: Date.now(), text: text}));
		reset();
	};

	let deleteFunc = (id) => {
		dispatch(deleteData(id));
	};

	return (
		<section className="flex flex-col items-center justify-start min-w-full min-h-screen pt-[6em] ">
			<div className="w-full max-w-xl px-4 py-6 border rounded-md shadow-md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className="mb-6 text-4xl font-bold text-center">To Do List</h1>
					<input
						ref={searchRefInput}
						onChange={searchFunc}
						type="text"
						placeholder="Search"
						className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-500"
					/>
					<div className="flex mb-4">
						<input
							type="text"
							placeholder="Add card"
							className="flex-1 px-4 py-2 border rounded-l-md bg-transparent focus:outline-none"
							{...register("text", {
								required: "text kiritilishi shart",
								min: {value: 1},
							})}
						/>
						<button
							type="submit"
							className="px-4 border hover:bg-[#181818] rounded-r-md">
							Add
						</button>
					</div>
					<div className="space-y-2">
						{filteredData.map((value) => {
							return (
								<div
									key={value.payload.id}
									className="flex items-center px-4 py-2 border rounded-md">
									<span className="flex-1">{value.payload.text.text}</span>
									<span className="mr-4 text-gray-600 cursor-pointer hover:text-blue-500">
										<FaEdit onClick={() => showModal(value.payload.id)} />
									</span>
									<span className="text-gray-600 scale-110 cursor-pointer hover:text-red-500">
										<AiOutlineDelete
											id={value.payload.id}
											onClick={() => deleteFunc(value.payload.id)}
										/>
									</span>
								</div>
							);
						})}
					</div>
				</form>
			</div>
			<Modal
				title="Edit Text"
				open={Boolean(editingItem)}
				onOk={handleOk}
				onCancel={handleCancel}>
				<input
					defaultValue={editingItem?.payload.text.text}
					ref={editRefInput}
					type="text"
					placeholder="edit text"
					className="flex-1 px-4 py-2 border rounded-l bg-transparent focus:outline-none w-full"
				/>
			</Modal>
		</section>
	);
}

export default MainComp;
