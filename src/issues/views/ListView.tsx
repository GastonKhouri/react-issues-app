import { useState } from 'react';

import { useIssues } from '../../hooks/useIssues';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../../interfaces/issue';

export const ListView = () => {

	const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] );
	const [ state, setState ] = useState<State>();

	const { issuesQuery, page, nextPage, prevPage } = useIssues( { state, labels: selectedLabels } );

	const onLabelChange = ( labelName: string ) => {

		selectedLabels.includes( labelName )
			? setSelectedLabels( selectedLabels.filter( label => label !== labelName ) )
			: setSelectedLabels( [ ...selectedLabels, labelName ] );

	};

	return (
		<div className="row mt-5">
			<div className="col-8">
				{
					issuesQuery.isLoading
						? <LoadingIcon />
						: <IssueList
							issues={ issuesQuery.data || [] }
							state={ state }
							onStateChange={ setState }
						/>
				}

				<div className="d-flex mt-2 justify-content-between">
					<button
						onClick={ prevPage }
						disabled={ issuesQuery.isFetching }
						className="btn btn-outline-primary"
					>
						Prev
					</button>

					<span>{ page }</span>

					<button
						onClick={ nextPage }
						disabled={ issuesQuery.isFetching }
						className="btn btn-outline-primary"
					>
						Next
					</button>
				</div>

			</div>

			<div className="col-4">
				<LabelPicker
					selectedLabels={ selectedLabels }
					onChange={ onLabelChange }
				/>
			</div>
		</div>
	);
};
